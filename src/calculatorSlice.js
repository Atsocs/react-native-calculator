import { createSlice } from "@reduxjs/toolkit";
import { evaluate } from "mathjs";
import { factor } from "./primefactors";
const initialState = {
  visor: "0",
  mode: "replace", // "replace" | "append"
};

function isNumeric(d) {
  return d.length === 1 && "0123456789".includes(d);
}

function isComma(c) {
  return c.length === 1 && ",".includes(c);
}

function lastNumber(string) {
  let i = string.length - 1;
  while (i >= 0 && (isNumeric(string[i]) || isComma(string[i]))) {
    i--;
  }
  return string.slice(i + 1, string.length);
}

function parenthesisStatus(string) {
  let i = 0;
  let parCount = 0;
  while (i < string.length) {
    if (string[i] === "(") {
      parCount++;
    } else if (string[i] === ")") {
      if (parCount === 0) {
        return -1; // error: string badly parenthesized
      }
      parCount--;
    }
    i++;
  }
  return parCount;
}

const precision = 15;

function allNumeric(string) {
  for (let i = 0; i < string.length; i++) {
    if (!isNumeric(string[i])) {
      return false;
    }
  }
  return true;
}

function factorExpression(string) {
  if (string.length === 0) return "";
  let numbers = [];
  let others = [];
  let startsWithNumber = isNumeric(string[0]);
  let isCaretAtNumber = startsWithNumber;
  let i = 0;
  let j = 0;
  while (i < string.length) {
    if (isCaretAtNumber) {
      while (j < string.length && isNumeric(string[j])) j++;
      numbers.push(string.slice(i, j));
      isCaretAtNumber = false;
      i = j;
      continue;
    }
    if (!isCaretAtNumber) {
      while (j < string.length && !isNumeric(string[j])) j++;
      others.push(string.slice(i, j));
      isCaretAtNumber = true;
      i = j;
      continue;
    }
  }
  // console.log(
  //   `startsWithNumber: ${startsWithNumber},\n numbers: ${numbers},\n others: ${others}`
  // );

  numbers = numbers.map((n) => `(${factor(n)})`);

  let ret = "";
  if (startsWithNumber) {
    ret += numbers.shift();
  }
  while (numbers.length > 0 || others.length > 0) {
    if (others.length > 0) ret += others.shift();
    if (numbers.length > 0) ret += numbers.shift();
  }
  return ret;
}

const invalidFormatError = () => console.log("Invalid Format");
const valueError = () => console.log("Value Error");

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    keyPress: (state, action) => {
      const key = action.payload;
      const parCount = parenthesisStatus(state.visor);
      const lastChar = state.visor[state.visor.length - 1];
      if (state.visor === "Infinity" || state.visor === "NaN") {
        return initialState;
      }
      switch (key) {
        case "+":
        case "-":
        case "*":
        case "/":
          if (state.mode === "replace") {
            state.mode = "append";
            return;
          }
          if ("+-*/".includes(lastChar)) {
            const newExpression =
              state.visor.slice(0, state.visor.length - 1) + key;
            if (
              !newExpression.includes("(*") &&
              !newExpression.includes("(/")
            ) {
              state.visor = newExpression;
            }
            return;
          }
          if (isNumeric(lastChar) || lastChar === ")") {
            state.visor += key;
            return;
          }

          if (lastChar === "(" && "+-".includes(key)) {
            state.visor += key;
            return;
          }

          return;
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
            if (!isNumeric(lastChar)) {
              state.visor += "0";
            }
            state.visor += ",";
            state.mode = "append";
          }
          return;
        case "factor":
          if (state.visor.includes("e")) {
            return;
          }
          if (allNumeric(state.visor)) {
            state.visor = factor(state.visor).toString();
            return;
          }
          state.visor = factorExpression(state.visor);
          return;
        case "()":
          if (state.mode === "replace") {
            state.visor = "(";
            state.mode = "append";
            return;
          }
          if (parCount === -1) {
            console.error("badly parenthesized");
            return;
          }

          if (isNumeric(lastChar) || lastChar === ")") {
            if (parCount > 0) {
              state.visor += ")";
              state.mode = "append";
              return;
            }
            if (parCount === 0) {
              state.visor += "*(";
              state.mode = "append";
              return;
            }
            return;
          }

          if (lastChar === "(") {
            state.visor += "(";
            state.mode = "append";
            return;
          }

          if ("+*-/".includes(lastChar)) {
            state.visor += "(";
            state.mode = "append";
            return;
          }
          return;
        case "=":
          const saveVisor = state.visor;
          if (parCount > 0) {
            state.visor += ")".repeat(parCount);
          }
          try {
            const visorText = state.visor.replace(/,/g, ".");
            const result = evaluate(visorText);
            state.visor = parseFloat(result.toPrecision(precision))
              .toString()
              .replace(/\./g, ",");
          } catch (error) {
            state.visor = saveVisor;
            invalidFormatError();
          }
          return;
        default:
          if (lastChar === ")") {
            state.visor += "*";
          }
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
