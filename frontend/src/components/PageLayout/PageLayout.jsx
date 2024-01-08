
import NavigationBar from '../NavigationBar'
import Header from '../Header'
import { useState } from 'react';

const PageLayout = ({ children }) => {

  // STATE TO MANAGE THEME
  const [theme, setTheme] = useState(window.sessionStorage.getItem('appTheme') || 'Light');

  const getThemeAuto = () => {
    const option = ['Light', 'Dark'];
    const randomVal = Math.random();

    return randomVal < 0.5 ? option[0] : option[1];
  };

  // CHANGE THEME
  const handleTheme = (e) => {
    e.preventDefault();

    setTheme(e.target.dataset.theme);
    window.sessionStorage.setItem('appTheme', e.target.dataset.theme);
  }
  console.log(theme);

  return (
    <>
      <NavigationBar
        handleTheme={handleTheme}
      />
      <Header />
      {children({ getThemeAuto, theme })}
    </>
  )
}

export default PageLayout;