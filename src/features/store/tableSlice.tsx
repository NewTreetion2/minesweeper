import { createSlice } from "@reduxjs/toolkit";
import { buttonInfo } from "./types";

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
      state.flagCount = 0;
    },
    changeTable: (state, action) => {
      // 데이터가 추가된 지뢰판으로 변경
      state.table = action.payload;
    },
    openButton: (state, action) => {
      // 클릭된 버튼의 clicked를 변경시켜 오픈
      if (state.table[action.payload[1]][action.payload[0]].clicked === false) {
        state.btnCount--;
        state.table[action.payload[1]][action.payload[0]].clicked = true;
      }

      if (state.table[action.payload[1]][action.payload[0]].flag === true) {
        state.flagCount--;
        state.table[action.payload[1]][action.payload[0]].flag = false;
      }
    },
    mineOpen: (state) => {
      // 만약 지뢰를 찾아 게임이 종료될 경우 모든 지뢰 오픈
      state.table.map((item) => {
        item.map((item) => {
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
              continue;
            }
            if (state.table[i][j].state === -1) {
              noMine = false;
            }
          }
        }

        if (noMine) {
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
              }
              isMineHere(j, i, width, height);
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
      if (
        !state.table[action.payload[1]][action.payload[0]].flag &&
        state.table[action.payload[1]][action.payload[0]].clicked === false
      ) {
        state.flagCount++;
        if (state.table[action.payload[1]][action.payload[0]].state === -1) {
          state.table[action.payload[1]][action.payload[0]].flag = true;
          state.bombCount--;
        } else {
          state.table[action.payload[1]][action.payload[0]].flag = true;
        }
      } else if (state.table[action.payload[1]][action.payload[0]].flag) {
        state.flagCount--;
        if (state.table[action.payload[1]][action.payload[0]].state === -1) {
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
