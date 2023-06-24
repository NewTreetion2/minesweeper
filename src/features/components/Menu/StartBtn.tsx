import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import { Button } from "react-bootstrap";
import { initTable } from "store/tableSlice";
import { gameReady } from "store/gameSlice";
import { buttonInfo } from "store/types";

function StartBtn() {
  const level = useSelector((state: RootState) => state.level.value);
  const { width, height, bomb } = level;
  const cell = { state: 0, clicked: false, x: 0, y: 0, flag: false };
  const dispatch = useDispatch();
  //   const readyTable: number[][] = Array.from(Array(level.height), () =>
  //     Array(level.width).fill(0)
  //   );

  const readyTable: buttonInfo[][] = new Array(height)
    .fill(null)
    .map((item, i) =>
      new Array(width).fill(null).map((item, j) => ({
        ...cell,
        x: j,
        y: i,
      }))
    );

  const onClickHandler = () => {
    alert(
      `가로: ${level.width} 세로: ${level.height} 폭탄: ${level.bomb}으로 게임을 시작합니다`
    );
    dispatch(gameReady());
    dispatch(initTable([readyTable, width, height, bomb]));
  };

  return <Button onClick={onClickHandler}>Game Start!</Button>;
}

export default StartBtn;
