import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  time: number;
  isRunning: boolean;
  finalTime: number;
};

const initialState: InitialState = {
  time: 0,
  isRunning: false,
  finalTime: 0,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
      state.time = 0;
      state.finalTime = 0;
    },
    increaseTime: (state) => {
      console.log(state.time, state.finalTime);
      state.time += 1;
      state.finalTime += 1;
    },
  },
});

export default timeSlice;
export const { startTimer, stopTimer, increaseTime } = timeSlice.actions;
