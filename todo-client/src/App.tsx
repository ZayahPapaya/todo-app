import React from 'react';
import './App.css';
import ToDo from './components/todo';
import { SettingsContext, settings } from './components/settings';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(useColorScheme());
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <SettingsContext.Provider value={settings}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <ToDo />
          </MantineProvider>
        </ColorSchemeProvider>
      </SettingsContext.Provider>
    </>
  );
}

export default App;
