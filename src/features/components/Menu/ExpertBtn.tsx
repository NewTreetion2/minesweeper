import { useDispatch } from "react-redux";
import { expert } from "store/levelSlice";

import { Button } from "react-bootstrap";

function ExpertBtn() {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(expert());
  };
  return <Button onClick={onClickHandler}>Expert</Button>;
}

export default ExpertBtn;
