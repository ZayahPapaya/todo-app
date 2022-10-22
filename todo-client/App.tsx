import React from 'react';
import './App.css';
import ToDo from './src/components/todo';
import { SettingsContext, settings } from './src/components/settings';
function App() {
  return (
    <>
    <SettingsContext.Provider value={settings}>
    <ToDo />
    </SettingsContext.Provider>
    </>
  );
}

export default App;
