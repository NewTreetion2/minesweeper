import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { customInfo } from "store/types";
import { custom } from "store/levelSlice";

import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "react-bootstrap";

import "components/Menu/CustomBtn.css";

const CustomBtn = () => {
  const [customInfo, setCustomInfo] = useState<customInfo>({
    width: 8,
    height: 8,
    bomb: 10,
  });
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [bomb, setBomb] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setCustomInfo({ width, height, bomb });
  }, [width, height, bomb]);

  const onClickHandler = () => {
    if (!width || !height || !bomb) {
      alert("값이 입력되지 않았습니다. 다시 입력해주세요");
      return;
    }
    if (
      customInfo.width * customInfo.height <= customInfo.bomb ||
      customInfo.bomb <= 0
    ) {
      alert(
        "폭탄 수가 0보다 작거나 가로 세로의 곱보다 많습니다. 다시 입력해주세요"
      );
      return;
    }
    dispatch(custom(customInfo));
  };

  return (
    <DropdownButton as={ButtonGroup} title="Custom" id="bg-nested-dropdown">
      <div>
        <div className="inputArea">
          가로
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setWidth(Number(e.target.value));
            }}
          />
        </div>
        <div className="inputArea">
          세로
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHeight(Number(e.target.value));
            }}
          />
        </div>
        <div className="inputArea">
          폭탄
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBomb(Number(e.target.value));
            }}
          />
        </div>
        <div className="confirm">
          <Button size="sm" onClick={onClickHandler}>
            확인
          </Button>
        </div>
      </div>
    </DropdownButton>
  );
};

export default CustomBtn;
