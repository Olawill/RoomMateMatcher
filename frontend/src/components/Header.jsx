import React from "react";

const Header = ({ darkModeEnabled }) => {

  const imgPath = darkModeEnabled
    ? import.meta.env.BASE_URL + "headerImg-dark.png"
    : import.meta.env.BASE_URL + "headerImg.png";

  return (
    <header className="header" style={{ marginBottom: "3rem" }}>
      <div className="header-background">
        <div className="image-with-gradient">
          <img src={imgPath} alt="header-image" />
          <div className="gradient-overlay"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
