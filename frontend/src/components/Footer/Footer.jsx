import React from "react";

const Footer = ({ theme }) => {
  const footerStyle = {
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#169516",
    color: theme === "Dark" ? "white" : "black",
    padding: "10px",
    textAlign: "center",
    marginTop: "50px",
  };


  return (
    <footer style={footerStyle}>
      <span style={{ color: "white" }}>Made with ❤️ by:{" "}</span>
      <a
        href="https://github.com/Olawill"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", textDecoration: "none" }}
      >
        Olawale Ajuwon
      </a>{" "}
      ⭐️{" "}
      <a
        href="https://github.com/SophiaOjegba"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", textDecoration: "none" }}
      >
        Sophia Ojegba
      </a>{" "}
      ⭐️{" "}
      <a
        href="https://github.com/AnaBykova"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", textDecoration: "none" }}
      >
        Ana Bykova
      </a>{" "}
      ⭐️{" "}
      <a
        href="https://github.com/MandyDev1"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "white", textDecoration: "none" }}
      >
        Mandy Liu
      </a>
    </footer>
  );
};

export default Footer;