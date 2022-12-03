import React from 'react';
import './App.css';
import ToDo from './components/todo';
import { SettingsContext, settings } from './components/settings';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { Auth0Provider } from '@auth0/auth0-react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_DOMAIN: string,
      REACT_APP_CLIENTID: string,
      REACT_APP_SERVER: string,
    }
  }
}

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(useColorScheme());
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Auth0Provider domain={process.env.REACT_APP_DOMAIN} clientId={process.env.REACT_APP_CLIENTID} redirectUri={window.location.origin}>
        <SettingsContext.Provider value={settings}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
              <ToDo />
            </MantineProvider>
          </ColorSchemeProvider>
        </SettingsContext.Provider>
      </Auth0Provider>
    </>
  );
}

export default App;
// process.env.REACT_APP_DOMAIN as string
// process.env.REACT_APP_CLIENTID as string
