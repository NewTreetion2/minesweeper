import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { gameEnd, gameWin } from "store/gameSlice";

import { Menubar } from "components/Menu";
import { MineTable } from "components/MineSweeper/index";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  // const [time, setTime] = useState<number>(0);
  const level = useSelector((state: RootState) => {
    return state.level.value;
  });
  const gameState = useSelector((state: RootState) => {
    return state.game.state;
  });
  const isWin = useSelector((state: RootState) => {
    return state.game.win;
  });
  const { btnCount, bombCount, flagCount } = useSelector((state: RootState) => {
    return state.table;
  });

  // let setTimer: NodeJS.Timer;

  // function timer() {
  //   setTimer = setInterval(function () {
  //     setTime((prevCount) => prevCount + 1);
  //   }, 1000);
  // }

  // function resetTimer() {
  //   clearInterval(setTimer);
  //   setTime(0);
  // }

  useEffect(() => {
    if (
      (btnCount === level.bomb || bombCount === 0) &&
      gameState === "start" &&
      flagCount < level.bomb
    ) {
      dispatch(gameWin());
      dispatch(gameEnd());
    }
  }, [btnCount, bombCount, gameState]);

  return (
    <div className="App">
      <header>
        <Menubar />
      </header>
      <main>
        <p>
          가로 {level.width} 세로 {level.height} 폭탄 수 {level.bomb}
        </p>
        <div>
          {gameState === "ready" || "start" ? <MineTable /> : ""}
          {isWin ? <p>승리하셨습니다</p> : ""}
        </div>
        <p>
          남은 버튼 수: {btnCount} 남은 폭탄 수: {bombCount} 화면에 띄워줄
          폭탄에서 깃발을 뺀 값 {level.bomb - flagCount}
        </p>
      </main>
    </div>
  );
}

export default App;
