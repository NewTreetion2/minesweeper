import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import MineTable from "components/Minesweeper/MineTable";
import Menubar from "components/Menu/Menubar";

import "./App.css";

function App() {
  const level = useSelector((state: RootState) => {
    return state.level.value;
  });
  const gameState = useSelector((state: RootState) => {
    return state.game.state;
  });

  return (
    <div className="App">
      <header>
        <Menubar />
      </header>
      <main>
        <p>
          가로 {level.width} 세로 {level.height} 폭탄 수 {level.bomb}
        </p>

        {gameState === "ready" || "start" ? <MineTable /> : ""}
      </main>
    </div>
  );
}

export default App;
