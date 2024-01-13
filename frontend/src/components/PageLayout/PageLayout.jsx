import { useEffect } from "react";
import NavigationBar from "../Navigation/NavigationBar";
import Header from "../Navigation/Header";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";

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

    setTheme(e.target.dataset.theme);
    window.sessionStorage.setItem("appTheme", e.target.dataset.theme);
  };

  return (
    <>
      <NavigationBar handleTheme={handleTheme} theme={theme} />
      <Header darkModeEnabled={theme === "Dark"} />
      {requireAuthentication && isLoading
        // ? "Loading the page..."
        ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )
        : children({ getThemeAuto, theme })}
    </>
  );
};

export default PageLayout;