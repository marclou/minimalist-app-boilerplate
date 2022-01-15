import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../contexts/theme';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button className="btn btn-square btn-outline border-0 dark:hover:bg-base-100" onClick={handleClick}>
      <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-xl text-white" />
    </button>
  );
};

export default ThemeToggle;
