import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  state: string;
};

const initialState: InitialState = {
  state: "waiting",
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
    },
    gameEnd: (state) => {
      state.state = "end";
    },
  },
});

// 게임의 상태관리 (시작, 시작대기, 중지, 대기)

export default gameSlice;
export const { gameStart, gameReady, gameEnd } = gameSlice.actions;
