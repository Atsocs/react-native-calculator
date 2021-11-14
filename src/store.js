import { configureStore } from "@reduxjs/toolkit";
import calculatorSlice from "./calculatorSlice";

const store = configureStore({
  reducer: calculatorSlice.reducer,
});

export default store;
