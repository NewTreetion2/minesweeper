import { useDispatch } from "react-redux";
import { beginner } from "store/levelSlice";

import { Button } from "react-bootstrap";

function BeginnerBtn() {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(beginner());
  };
  return <Button onClick={onClickHandler}>Beginner</Button>;
}

export default BeginnerBtn;
