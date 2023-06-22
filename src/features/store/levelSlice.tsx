import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  id: string;
  value: {
    width: number;
    height: number;
    bomb: number;
  };
};

const initialState: InitialState = {
  id: "Beginner",
  value: {
    width: 8,
    height: 8,
    bomb: 10,
  },
};

const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    beginner: (state) => {
      state.value.width = 8;
      state.value.height = 8;
      state.value.bomb = 10;
    },
    intermediate: (state) => {
      state.value.width = 16;
      state.value.height = 16;
      state.value.bomb = 40;
    },
    expert: (state) => {
      state.value.width = 32;
      state.value.height = 16;
      state.value.bomb = 99;
    },
    custom: (state, action) => {
      state.value.width = action.payload.width;
      state.value.height = action.payload.height;
      state.value.bomb = action.payload.bomb;
    },
  },
});

// 게임 레벨의 상태 관리 ( 초급, 중급, 고급, 커스텀 )

export default levelSlice;
export const { beginner, intermediate, expert, custom } = levelSlice.actions;
