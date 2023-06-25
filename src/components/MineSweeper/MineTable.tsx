import React, { Fragment } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { RootState } from "store/store";
import { buttonInfo } from "store/types";

import { MineButton } from "components/MineSweeper";

import "components/MineSweeper/MineTable.css";

const MineTable = React.memo(() => {
  // 지뢰판을 제작해주는 컴포넌트
  const renderTable = useSelector((state: RootState) => state.table.table);

  //rendering option

  const rowWidth = `${renderTable[0]?.length * 32}px`;

  return (
    <div className="tableWrap" style={{ width: rowWidth }}>
      {renderTable.map((row: buttonInfo[], rowIndex: number) => (
        <Fragment key={rowIndex}>
          {row.map((cell, cellIndex: number) => (
            <div className="tableContent" key={cellIndex}>
              <MineButton info={cell} />
            </div>
          ))}
        </Fragment>
      ))}
    </div>
  );
});

export default MineTable;
