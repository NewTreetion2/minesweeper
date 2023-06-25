import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/store";
import { gameEnd, gameWin } from "store/gameSlice";
import { stopTimer } from "store/timeSlice";

import { Menubar } from "components/Menu";
import { Timer } from "components/Timer";
import { MineTable } from "components/MineSweeper/";

import "./App.css";

const App = React.memo(() => {
  const dispatch = useDispatch();
  // const [time, setTime] = useState<number>(0);
  const { id, value } = useSelector(
    (state: RootState) => state.level,
    (prev, next) => prev === next
  );
  const gameState = useSelector(
    (state: RootState) => state.game.state,
    (prev, next) => prev === next
  );
  const { btnCount, bombCount, flagCount } = useSelector(
    (state: RootState) => state.table,
    (prev, next) =>
      prev.btnCount === next.btnCount &&
      prev.bombCount === next.bombCount &&
      prev.flagCount === next.flagCount
  );
  const { finalTime, isRunning } = useSelector(
    (state: RootState) => state.time,
    (prev, next) =>
      prev.finalTime === next.finalTime && prev.isRunning === next.isRunning
  );
  const isWin = useSelector((state: RootState) => {
    return state.game.win;
  });

  useEffect(() => {
    if (
      (btnCount === value.bomb || bombCount === 0) &&
      gameState === "start" &&
      flagCount >= 0 // 승리 조건
    ) {
      dispatch(gameWin());
      dispatch(gameEnd());
    }

    if (isWin) {
      alert(`${finalTime}초 만에 승리하셨습니다!`);
    }

    if (gameState === "end") {
      dispatch(stopTimer());
    }
  }, [btnCount, bombCount, gameState]);

  return (
    <div className="App">
      <header>
        <Menubar />
      </header>
      <main>
        <div className="level">
          <div className="levelText">선택된 레벨 : {id} </div>
          <div className="infoText">가로 : {value.width} </div>
          <div className="infoText">세로 : {value.height} </div>
          <div className="infoText">폭탄 : {value.bomb}</div>
        </div>
        <div>
          <div className="timer">
            <div>Flag : {flagCount}</div>
            <div>{isRunning ? <Timer /> : <div>Timer : 0</div>}</div>
          </div>
          {gameState === "ready" || "start" ? <MineTable /> : ""}
        </div>
      </main>
    </div>
  );
});

export default App;
