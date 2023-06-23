import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import {
  changeTable,
  emptyOpen,
  flagButton,
  mineOpen,
  openButton,
} from "store/tableSlice";
import { buttonInfo } from "store/types";
import { gameEnd, gameStart } from "store/gameSlice";
import { placeMine } from "./Minesweeper";

import "components/Minesweeper/MineButton.css";

function MineButton({ info }: { info: buttonInfo }) {
  const gameState = useSelector((state: RootState) => state.game.state);
  const level = useSelector((state: RootState) => state.level.value);
  const { width, height, bomb } = level;

  const cell = { state: 0, clicked: false, x: 0, y: 0 };
  let table: buttonInfo[][] = new Array(height).fill(null).map((item, i) =>
    new Array(width).fill(null).map((item, j) => ({
      ...cell,
      x: j,
      y: i,
    }))
  ); // 이 부분 최적화를 위해 이후 리듀서에 포함 시킬 예정

  const dispatch = useDispatch();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameState === "ready") {
      table = placeMine(width, height, bomb, table, info.x, info.y); // 지뢰가 포함된 데이터 테이블 생산 -> 최초 1회에 터지지 않게 하기 위한 로직
      dispatch(changeTable(table));
      dispatch(gameStart());
      if (info.state === 0) {
        dispatch(emptyOpen([info.x, info.y, width, height]));
      } else {
        dispatch(openButton([info.x, info.y]));
      }
    } else if (gameState === "start") {
      if (info.state === -1) {
        alert("지뢰를 고르셨습니다. 패배!");
        dispatch(mineOpen());
        dispatch(gameEnd());
      } else if (info.state > 0) {
        dispatch(openButton([info.x, info.y]));
      } else if (info.state === 0) {
        dispatch(emptyOpen([info.x, info.y, width, height]));
      }
    }
  };

  const onContextMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(flagButton([info.x, info.y]));
  };

  return (
    <button
      className={`mineButton ${
        info.state === -1 && info.clicked === true ? "mine" : ""
      } ${info.state === -2 && info.clicked === false ? "flag" : ""}`}
      onClick={onClickHandler}
      onContextMenu={onContextMenuHandler}
    >
      {info.clicked ? info.state : ""}
    </button>
  );
}

export default MineButton;
