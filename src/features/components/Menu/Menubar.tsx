import React from "react";
import {
  BeginnerBtn,
  IntermediateBtn,
  ExpertBtn,
  CustomBtn,
  StartBtn,
} from "components/Menu/index";

import ButtonGroup from "react-bootstrap/ButtonGroup";

const Menubar = React.memo(() => {
  // 각 버튼들 이후 하나의 컴포넌트로 관리할 수 있게 변경하기
  return (
    <ButtonGroup>
      <BeginnerBtn />
      <IntermediateBtn />
      <ExpertBtn />
      <CustomBtn />
      <StartBtn />
    </ButtonGroup>
  );
});

export default Menubar;
