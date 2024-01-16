import { useEffect } from "react";
import NavigationBar from "../Navigation/NavigationBar";
import Header from "../Navigation/Header";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import Footer from "../Footer/Footer";

const PageLayout = ({ children, requireAuthentication = false }) => {
  const { isLoading } = useAuth0();

  // STATE TO MANAGE THEME
  const [theme, setTheme] = useState(
    window.sessionStorage.getItem("appTheme") || "Light"
  );

  useEffect(() => {
    const root = document.getElementById('root');
    if (theme === 'Dark') {
      root.style.backgroundColor = 'rgb(41, 40, 40)';
    } else {
      root.style.backgroundColor = '#FFF';
    }
  }, [theme]);

  const getThemeAuto = () => {
    const option = ["Light", "Dark"];
    const randomVal = Math.random();

    return randomVal < 0.5 ? option[0] : option[1];
  };

  // CHANGE THEME
  const handleTheme = (e) => {
    e.preventDefault();

    const themeOption = e.target.dataset.theme;
    if (themeOption === 'Auto') {
      const themeAuto = getThemeAuto();
      setTheme(themeAuto);
      window.sessionStorage.setItem("appTheme", themeAuto);
    } else {
      setTheme(themeOption);
      window.sessionStorage.setItem("appTheme", themeOption);
    }
  };

  return (
    <div style={{position: 'relative'}}>
      <NavigationBar handleTheme={handleTheme} theme={theme} />
      <Header darkModeEnabled={theme === "Dark"} />
      {requireAuthentication && isLoading
        // ? "Loading the page..."
        ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
        : children({ theme })}
          <Footer />
    </div>
  );
};

export default PageLayout;