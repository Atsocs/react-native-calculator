import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: { value: 0 },
  },
  reducers: {
    increment: (state) => {
      state.counter.value += 1;
    },
    decrement: (state) => {
      state.counter.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.counter.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice;
