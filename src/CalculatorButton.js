import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { keyPress } from "./calculatorSlice";

export default function CalculatorButton({ children: value }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        dispatch(keyPress(value));
      }}
    >
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    margin: 10,
    aspectRatio: 1,
    borderRadius: 1000,
  },
  text: {
    fontSize: 25,
  },
});
