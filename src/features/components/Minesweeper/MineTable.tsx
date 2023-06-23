import { RootState } from "store/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import MineButton from "./MineButton";
import { buttonInfo } from "store/types";

function MineTable() {
  const renderTable = useSelector((state: RootState) => state.table.table);

  return (
    <table>
      <tbody>
        {renderTable.map((row: buttonInfo[], rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <MineButton info={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MineTable;