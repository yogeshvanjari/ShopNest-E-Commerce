import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "950px",
    margin: "40px auto",
    padding: "45px 30px",
    background:
      "linear-gradient(145deg, #18181b 0%, #111113 100%)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
    textAlign: "center",
    color: "#ffffff",
  };

  const profileImageStyle = {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #f97316",
    padding: "4px",
    background: "#18181b",
    boxShadow: "0 0 30px rgba(249, 115, 22, 0.35)",
    marginBottom: "20px",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "7px 14px",
    margin: "5px",
    borderRadius: "20px",
    background: "rgba(249, 115, 22, 0.12)",
    border: "1px solid rgba(249, 115, 22, 0.35)",
    color: "#fb923c",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  const socialBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    padding: "11px 20px",
    background: "#27272a",
    color: "#ffffff",
    borderRadius: "9px",
    textDecoration: "none",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    fontWeight: "500",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>

      {/* Profile Image */}
      <img
        src="/profile.png"
        alt="Yogesh Vanjari"
        style={profileImageStyle}
      />

      {/* Heading */}
      <p
        style={{
          color: "#f97316",
          fontWeight: "600",
          letterSpacing: "2px",
          fontSize: "0.85rem",
          marginBottom: "8px",
        }}
      >
        HELLO, I'M
      </p>

      <h1
        style={{
          fontSize: "2.8rem",
          margin: "0 0 8px",
          color: "#ffffff",
          fontWeight: "700",
        }}
      >
        Yogesh Vanjari
      </h1>

      <h2
        style={{
          fontSize: "1.35rem",
          color: "#f97316",
          marginBottom: "20px",
          fontWeight: "600",
        }}
      >
        MERN Stack Developer
      </h2>

      {/* About Description */}
      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.08rem",
          lineHeight: "1.8",
          maxWidth: "720px",
          margin: "0 auto 25px",
        }}
      >
        I'm a Full Stack Developer focused on building modern, responsive,
        and scalable web applications. I enjoy developing complete web
        solutions using React.js, Node.js, Express.js, MongoDB, and
        PostgreSQL — from creating clean user interfaces to building
        RESTful APIs and database-driven applications.
      </p>

      {/* Skills */}
      <div
        style={{
          marginBottom: "30px",
          maxWidth: "700px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <span style={badgeStyle}>React.js</span>
        <span style={badgeStyle}>JavaScript</span>
        <span style={badgeStyle}>Node.js</span>
        <span style={badgeStyle}>Express.js</span>
        <span style={badgeStyle}>MongoDB</span>
        <span style={badgeStyle}>PostgreSQL</span>
        <span style={badgeStyle}>REST API</span>
        <span style={badgeStyle}>Git & GitHub</span>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "80%",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          margin: "30px auto",
        }}
      />

      {/* Connect Section */}
      <h3
        style={{
          fontSize: "1.3rem",
          marginBottom: "8px",
          color: "#ffffff",
        }}
      >
        Let's Connect
      </h3>

      <p
        style={{
          color: "#71717a",
          marginBottom: "20px",
          fontSize: "0.95rem",
        }}
      >
        Explore my projects and connect with me professionally.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {/* GitHub */}
        <a
          href="https://github.com/yogeshvanjari"
          target="_blank"
          rel="noreferrer"
          style={socialBtnStyle}
        >
          💻 GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yogeshvanjari"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(59, 130, 246, 0.12)",
            borderColor: "rgba(59, 130, 246, 0.5)",
            color: "#60a5fa",
          }}
        >
          💼 LinkedIn
        </a>

        {/* Email */}
        <a
          href="mailto:yogeshvanjari2002@gmail.com"
          style={{
            ...socialBtnStyle,
            background: "rgba(249, 115, 22, 0.12)",
            borderColor: "rgba(249, 115, 22, 0.5)",
            color: "#fb923c",
          }}
        >
          ✉️ Email Me
        </a>
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "35px",
          color: "#52525b",
          fontSize: "0.85rem",
        }}
      >
        Building ideas into real-world web applications 🚀
      </p>
    </div>
  );
};

export default About;