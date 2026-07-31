const Razorpay = require('razorpay');
const crypto = require('crypto');

const createOrder = async (req, res) => {
  try {
    const isBypassMode = process.env.STUDENT_BYPASS_MODE === 'true';

    // Student bypass mode - return mock order for testing
    if (isBypassMode || req.body.bypassMode) {
      const mockOrder = {
        id: 'order_' + Date.now(),
        amount: Math.round(req.body.amount * 100),
        currency: "INR",
        receipt: 'receipt_' + Date.now(),
        status: 'created',
        created_at: Math.floor(Date.now() / 1000),
        notes: {
          mode: 'STUDENT_BYPASS'
        }
      };
      return res.json(mockOrder);
    }

    // Normal Razorpay flow
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    // Razorpay accepts amount in paise
    const options = {
      amount: Math.round(req.body.amount * 100),
      currency: "INR",
    };
    
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).json({ message: "Order creation failed" });
    
    res.json({
      ...order,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Payment Order Creation Error:", error);
    res.status(500).json({ message: error.message || "Payment initialization failed" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const isBypassMode = process.env.STUDENT_BYPASS_MODE === 'true';

    // Student bypass mode - always return success for testing
    if (isBypassMode || req.body.bypassMode) {
      return res.status(200).json({ 
        message: "Payment verified successfully (Student Bypass Mode)",
        bypass: true 
      });
    }

    // Normal Razorpay verification flow
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };

