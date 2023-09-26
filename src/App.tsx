import React from 'react';
import './App.css';
import ListContainer from "./components/list-container";
import { PlayerProvider } from "./player-context";

function App() {
  return (
      <PlayerProvider>
        <div className="App">
            <ListContainer />
        </div>
      </PlayerProvider>
  );
}

export default App;
