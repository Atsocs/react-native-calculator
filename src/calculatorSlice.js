import { createSlice } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";
import Snackbar from 'react-native-snackbar';

const initialState = {
  visor: "0",
  mode: "replace", // "replace" | "append"
  snackbar: {
    visible: false,
    message: "Formato usado inválido",
  },
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
            const result = evaluate(state.visor);
            console.log(result);
            state.visor = result.toString();
          } catch (error) {
            Snackbar.show({
              text: "Hello world",
              duration: Snackbar.LENGTH_SHORT,
            });
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
