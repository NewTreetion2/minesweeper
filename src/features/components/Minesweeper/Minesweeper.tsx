import { useSelector } from "react-redux";
import { RootState } from "store/store";

function Minesweeper() {
  const level = useSelector((state: RootState) => state.level.value);
  const game = useSelector((state: RootState) => state.game.state);
  const { width, height, bomb } = level;

  let table: number[][] = Array.from(Array(height), () => Array(width).fill(0)); // 입력 받은 가로, 세로를 통해 이차원 배열 생성
  // 0은 빈 공간, 1부터는 주변의 지뢰 갯수, -1은 지뢰로 명시한다

  table = placeMine(width, height, bomb, table); //

  return <div></div>;
}

export default Minesweeper;

function placeMine( // 지뢰를 랜덤으로 배치하는 함수
  width: number,
  height: number,
  bomb: number,
  table: number[][]
) {
  for (let i = 0; i < bomb; i++) {
    const bombX = Math.floor(Math.random() * width);
    const bombY = Math.floor(Math.random() * height);
    if (table[bombY][bombX] === -1) {
      i--;
    } else {
      table[bombY][bombX] = -1;
      countMine(bombX, bombY, table, width, height); // 여기서 지뢰를 설치하면서 지뢰 카운팅까지 동시에 진행해준다
    }
  }

  return table;
}

function countMine( // 지뢰를 설치하면서 동시에 지뢰 주변에 있는 개체들에게 지뢰 수를 더해주는 함수
  bombX: number,
  bombY: number,
  table: number[][],
  width: number,
  height: number
) {
  const xLen = bombX + 2;
  const yLen = bombY + 2;

  for (let i = bombY - 1; i < yLen; i++) {
    for (let j = bombX - 1; j < xLen; j++) {
      if (
        i < 0 ||
        j < 0 ||
        j === width ||
        i === height ||
        (i === bombY && j === bombX)
      ) {
        continue;
      }
      table[i][j] += table[i][j] !== -1 ? 1 : 0;
    }
  } // 입력받은 좌표의 주변 8칸을 모두 +1 해준다
  // 이 때, 0 이하와 width, height를 벗어나는 부분, 그리고 지뢰 좌표는 예외로 처리해준다
}
