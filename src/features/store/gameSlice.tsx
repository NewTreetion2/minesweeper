import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  state: string;
  win: boolean;
};

const initialState: InitialState = {
  state: "waiting",
  win: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    gameStart: (state) => {
      state.state = "start";
    },
    gameReady: (state) => {
      state.state = "ready";
      state.win = false;
    },
    gameEnd: (state) => {
      state.state = "end";
    },
    gameWin: (state) => {
      state.win = true;
    },
  },
});

// 게임의 상태관리 (시작, 시작대기, 중지, 대기)

export default gameSlice;
export const { gameStart, gameReady, gameEnd, gameWin } = gameSlice.actions;
