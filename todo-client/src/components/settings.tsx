import React from 'react';
export const settings = {
  showCompleted: false,
  viewableItems: 3,
  difficultySort: false,
}
export const SettingsContext = React.createContext(settings);