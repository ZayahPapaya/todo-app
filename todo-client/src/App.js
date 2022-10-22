
import './App.css';
import ToDo from './components/todo.js';
import { SettingsContext, settings } from './components/settings';
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
