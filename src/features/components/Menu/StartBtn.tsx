import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { gameStart } from "store/gameSlice";
import { RootState } from "store/store";

function StartBtn() {
  const level = useSelector((state: RootState) => state.level.value);
  const dispatch = useDispatch();
  const onClickHandler = () => {
    alert(
      `가로: ${level.width} 세로: ${level.height} 폭탄: ${level.bomb}으로 게임을 시작합니다`
    );
    dispatch(gameStart());
  };
  return <Button onClick={onClickHandler}>Game Start!</Button>;
}

export default StartBtn;
