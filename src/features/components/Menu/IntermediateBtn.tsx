import { useDispatch } from "react-redux";
import { intermediate } from "store/levelSlice";

import { Button } from "react-bootstrap";

function IntermediateBtn() {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(intermediate());
  };
  return <Button onClick={onClickHandler}>Intermediate</Button>;
}

export default IntermediateBtn;
