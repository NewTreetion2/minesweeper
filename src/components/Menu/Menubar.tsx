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
