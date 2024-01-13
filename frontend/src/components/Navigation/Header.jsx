import React from "react";

const Header = ({ darkModeEnabled }) => {
  const imgPath = darkModeEnabled
    ? import.meta.env.BASE_URL + "headerImgDark2.png"
    : import.meta.env.BASE_URL + "headerImg.png";

    const overlayClass = darkModeEnabled
    ? "gradient-overlay-dark"
    : "gradient-overlay-light";

  return (
    <header className="header">
      <div className="header-background">
        <div className="image-with-gradient">
          <img src={imgPath} alt="header-image" />
          <div className={overlayClass}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
