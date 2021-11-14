import { createSlice } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";

const initialState = {
  visor: "0",
  mode: "replace", // "replace" | "append"
};

function isnumeric(d) {
  return d.length === 1 && "0,123456789".includes(d);
}

function lastNumber(string) {
  let i = string.length - 1;
  while (i >= 0 && isnumeric(string[i])) {
    i--;
  }
  return string.slice(i + 1, string.length);
}

const precision = 15;

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
        case ",":
          if (!lastNumber(state.visor).includes(",")) {
            state.visor += ",";
            state.mode = "append";
          }
          return;
        case "=":
          try {
            const visorText = state.visor.replace(/,/g, ".");
            const result = evaluate(visorText);
            console.log(result);
            state.visor = parseFloat(result.toPrecision(precision))
              .toString()
              .replace(/\./g, ",");
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
