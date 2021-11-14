import { configureStore } from "@reduxjs/toolkit";
import calculatorSlice from "./calculatorSlice";

const store = configureStore({
  reducer: calculatorSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default store;
