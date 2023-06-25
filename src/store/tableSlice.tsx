import { createSlice } from "@reduxjs/toolkit";
import { buttonInfo } from "./types";

import { placeMine } from "components/MineSweeper/MineLogic";

type InitialState = {
  table: buttonInfo[][];
  btnCount: number;
  bombCount: number;
  flagCount: number;
};

const initialState: InitialState = {
  table: [],
  btnCount: 0,
  bombCount: 0,
  flagCount: 0,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    initTable: (state, action) => {
      // 최초 지뢰판 초기화
      state.table = action.payload[0];
      state.btnCount = action.payload[1] * action.payload[2];
      state.bombCount = action.payload[3];
      state.flagCount = action.payload[3];
    },
    changeTable: (state, action) => {
      // 데이터가 추가된 지뢰판으로 변경
      const width = action.payload[0];
      const height = action.payload[1];
      const bomb = action.payload[2];
      const x = action.payload[3];
      const y = action.payload[4];
      state.table = placeMine(width, height, bomb, state.table, x, y);
    },
    openButton: (state, action) => {
      const flagTrue =
        state.table[action.payload[1]][action.payload[0]].flag === true;
      const clickedFalse =
        state.table[action.payload[1]][action.payload[0]].clicked === false;

      // 클릭된 버튼의 clicked를 변경시켜 오픈
      if (clickedFalse) {
        state.btnCount--;
        state.table[action.payload[1]][action.payload[0]].clicked = true;
      }

      if (flagTrue) {
        state.flagCount++;
        state.table[action.payload[1]][action.payload[0]].flag = false;
      }
    },
    mineOpen: (state) => {
      // 만약 지뢰를 찾아 게임이 종료될 경우 모든 지뢰 오픈
      state.table.forEach((item) => {
        item.forEach((item) => {
          if (item.state === -1) {
            item.clicked = true;
          }
        });
      });
    },
    emptyOpen: (state, action) => {
      // 0을 클릭했을 경우 근처의 지뢰를 제외한 모든 칸 오픈
      function isMineHere(x: number, y: number, width: number, height: number) {
        if (state.table[y][x].clicked === false) {
          state.btnCount--;
          state.table[y][x].clicked = true;
        }
        let iLen: number = y + 2;
        let jLen: number = x + 2;
        let noMine: boolean = true;

        for (let i = y - 1; i < iLen; i++) {
          for (let j = x - 1; j < jLen; j++) {
            if (
              i < 0 ||
              j < 0 ||
              i === height ||
              j === width ||
              (i === x && j === y) ||
              state.table[i][j].clicked === true ||
              state.table[i][j].flag === true
            ) {
              // 클릭한 요소 주위 8칸을 탐색하는데 지뢰판을 벗어나는 경우, 클릭한 요소 본인, click된 요소, flag 처리된 요소는 건너뛴다
              continue;
            }
            if (state.table[i][j].state === -1) {
              noMine = false;
            }
          }
        } // 클릭한 요소 주위에 지뢰가 있다면 noMine이 false가 되고 해당 칸은 재귀함수를 호출하지 않는다

        if (noMine) {
          // 만일 클릭한 요소 주위에 지뢰가 없다면 조건문을 실행해 재귀함수를 호출
          for (let i = y - 1; i < iLen; i++) {
            for (let j = x - 1; j < jLen; j++) {
              if (
                i < 0 ||
                j < 0 ||
                i === height ||
                j === width ||
                (i === x && j === y) ||
                state.table[i][j].clicked === true ||
                state.table[i][j].flag === true
              ) {
                continue;
              } // 마찬가지로 위의 경우는 제외하고
              isMineHere(j, i, width, height); // 해당 칸을 기준으로 다시 재귀함수를 호출
            }
          }
        }
      }
      isMineHere(
        action.payload[0],
        action.payload[1],
        action.payload[2],
        action.payload[3]
      );
    },
    flagButton: (state, action) => {
      // 우측 마우스 클릭 시 플래그 설치, 알고리즘 이후 추가 예정
      const flagFalse =
        state.table[action.payload[1]][action.payload[0]].flag === false;
      const flagTrue =
        state.table[action.payload[1]][action.payload[0]].flag === true;
      const clickedFalse =
        state.table[action.payload[1]][action.payload[0]].clicked === false;
      const isMine =
        state.table[action.payload[1]][action.payload[0]].state === -1;

      if (flagFalse && clickedFalse) {
        state.flagCount--;
        if (isMine) {
          state.table[action.payload[1]][action.payload[0]].flag = true;
          state.bombCount--;
        } else {
          state.table[action.payload[1]][action.payload[0]].flag = true;
        }
      } else if (flagTrue) {
        state.flagCount++;
        if (isMine) {
          state.table[action.payload[1]][action.payload[0]].flag = false;
          state.bombCount++;
        } else {
          state.table[action.payload[1]][action.payload[0]].flag = false;
        }
      }
    },
  },
});

// 데이터 테이블 상태관리

export default tableSlice;
export const {
  initTable,
  changeTable,
  openButton,
  mineOpen,
  emptyOpen,
  flagButton,
} = tableSlice.actions;
