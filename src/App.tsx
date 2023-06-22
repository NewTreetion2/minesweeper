import React from "react";
import "./App.css";
import Menubar from "components/Menu/Menubar";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Minesweeper from "components/Minesweeper/Minesweeper";

function App() {
  const level = useSelector((state: RootState) => {
    return state.level.value;
  });
  const game = useSelector((state: RootState) => {
    return state.game.state;
  });

  return (
    <div className="App">
      <header>
        <Menubar />
      </header>
      <main>
        <p>가로 {level.width}</p>
        <p>세로 {level.height}</p>
        <p>폭탄 수 {level.bomb}</p>
        {game === "start" ? <Minesweeper /> : ""}
      </main>
    </div>
  );
}

export default App;
