import React from 'react';
export const settings = {
  showCompleted: true,
  viewableItems: 3,
  difficultySort: false,
}
export const SettingsContext = React.createContext(settings);