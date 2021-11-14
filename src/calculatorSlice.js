import { createSlice } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";

const initialState = {
  visor: "0",
  mode: "replace", // "replace" | "append"
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    keyPress: (state, action) => {
      const key = action.payload;
      switch (key) {
        case "C":
          return initialState;
        case "←":
          state.visor = state.visor.slice(0, -1);
          if (state.visor.length === 0) {
            state.visor = "0";
          }
          return;
        case "=":
          try {
            const visorText = state.visor.replace(/,/g, ".");
            const result = evaluate(visorText);
            console.log(result);
            state.visor = result.toString().replace(/\./g, ",");
          } catch (error) {
            console.log("Invalid format");
          }
          return;
        default:
          if (state.mode === "append") state.visor += key;
          if (state.mode === "replace") {
            state.visor = key;
            state.mode = "append";
          }
          return;
      }
    },
  },
});

export const { keyPress } = calculatorSlice.actions;

export default calculatorSlice;
