import React, { useState } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { getFromTheme } from './utils';
import './index.css';

import Game from './game';
import themes from './config/themes.json';

function App () {
  const [themeName, toggleTheme] = useTheme('darkTheme');

  const GlobalStyle = createGlobalStyle`
    body {
        background: ${getFromTheme('body.bg')};
        color: ${getFromTheme('body.color')};
        transition: background .3s ease;
    }
  `;
  
  return (
    <ThemeProvider theme={themes[themeName]}>
      <React.Fragment>
        <GlobalStyle />
        <Game toggleTheme={toggleTheme} />
      </React.Fragment>
    </ThemeProvider>
  );
}

function useTheme(defaultThemeName) {
  const [themeName, setTheme] = useState(defaultThemeName);

  function switchTheme(name) {
    setTheme(themeName === 'darkTheme' ? 'lightTheme' : 'darkTheme');
  }

  return [themeName, switchTheme];
}


export default App;



// Line 2 and 21: We’re importing ThemeProvider and passing it to current theme object, so every component which was created using styled components will have access to current theme.
// Line 30–38: We write our first hook which uses inside React’s hook useState. More about React hooks here.
// Line 10: We’re declaring our state for functional component which will store current theme name.
// Line 12: We’re creating new global styles based on current theme, which will update on theme switch .
// Line 30: We’re declaring help function to switch current theme, using setTheme. It’s like setState alternative for functional components.
// Line 24: We’re passing theme switch callback to our app.
// In my example I’m using only 2 themes. You can rewrite useTheme hook for a larger number of themes.
