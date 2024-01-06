import React from "react";

const Header = () => {
  const imgPath = import.meta.env.BASE_URL + 'headerImg.png';

  return (
    <header className="header">
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