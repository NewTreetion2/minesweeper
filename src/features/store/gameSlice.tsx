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
    gameEnd: (state) => {
      state.state = "end";
    },
    gameWait: (state) => {
      state.state = "waiting";
    },
  },
});

// 게임의 상태관리 (시작, 중지, 대기)

export default gameSlice;
export const { gameStart, gameEnd, gameWait } = gameSlice.actions;
