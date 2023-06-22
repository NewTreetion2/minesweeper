import { configureStore } from "@reduxjs/toolkit";
import levelSlice from "./levelSlice";
import gameSlice from "./gameSlice";

export const store = configureStore({
  reducer: {
    level: levelSlice.reducer,
    game: gameSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
