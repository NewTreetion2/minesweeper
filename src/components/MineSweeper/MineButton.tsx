import { useDispatch, useSelector } from "react-redux";

import { RootState } from "store/store";
import {
  changeTable,
  emptyOpen,
  flagButton,
  mineOpen,
  openButton,
} from "store/tableSlice";
import { gameEnd, gameStart } from "store/gameSlice";
import { startTimer, stopTimer } from "store/timeSlice";
import { buttonInfo } from "store/types";

import "components/MineSweeper/MineButton.css";

const MineButton = ({ info }: { info: buttonInfo }) => {
  // 지뢰판의 각 요소인 버튼을 만들어주는 컴포넌트
  const gameState = useSelector((state: RootState) => state.game.state);

  const level = useSelector((state: RootState) => state.level.value);
  const { width, height, bomb } = level;

  const dispatch = useDispatch();

  const handleReady = () => {
    dispatch(changeTable([width, height, bomb, info.x, info.y]));
    dispatch(gameStart());
    dispatch(startTimer());
    if (info.state === 0) {
      dispatch(emptyOpen([info.x, info.y, width, height]));
    } else {
      dispatch(openButton([info.x, info.y]));
    }
  }; // 게임 상태가 "ready"일 때 버튼 좌클릭 이벤트 관리

  const handleStart = () => {
    if (info.state === -1) {
      // 지뢰를 클릭하면
      alert("지뢰를 고르셨습니다. 패배!");
      dispatch(mineOpen()); // 모든 지뢰를 오픈하고
      dispatch(gameEnd()); // 게임을 종료하고
      dispatch(stopTimer()); // 타이머를 종료한다
    } else if (info.state > 0) {
      // 숫자를 클릭하면
      dispatch(openButton([info.x, info.y])); // 해당칸 오픈
    } else if (info.state === 0) {
      // 0을 클릭하면
      dispatch(emptyOpen([info.x, info.y, width, height]));
      // 이어진 모든 칸 오픈
    }
  }; // 게임 상태가 "start" 일 때 버튼 좌클릭 이벤트 관리

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameState === "ready") handleReady();
    else if (gameState === "start") handleStart();
    else if (gameState === "end") e.preventDefault();
  };

  const onContextMenuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameState !== "start") return;

    e.preventDefault();
    dispatch(flagButton([info.x, info.y]));
  };

  const isMine = info.state === -1 && info.clicked === true; // 지뢰이며 클릭이 됐는지
  const isFlag = info.flag === true && info.clicked === false; // 깃발이며 클릭이 안됐는지
  const isNumber = info.state >= 0 && info.clicked === true; // 숫자이며 클릭이 됐는지

  return (
    <button
      className={`button ${isMine ? "mine" : ""} ${isFlag ? "flag" : ""}
      ${isNumber ? "blank" : ""}`}
      onClick={onClickHandler}
      onContextMenu={onContextMenuHandler}
    >
      {info.clicked && info.state > 0 ? info.state : ""}
    </button>
  );
};

export default MineButton;
