import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export default function CalculatorButton({ children: value }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        console.log("pressed: " + value);
        dispatch(incrementByAmount(parseInt(value)));
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
    borderRadius: 100,
  },
  text: {
    fontSize: 25,
  },
});
