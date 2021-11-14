import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";
import Grid from "./Grid";
import CalculatorButton from "./CalculatorButton";
import keys from "./CalculatorKeys";

export default function Calculator() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Value: {count} </Text>
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(decrement())}>
          <Text>Decrement</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(incrementByAmount(count))}>
          <Text>Double</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <Grid
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          rows={5}
          cols={4}
        >
          {keys.map((key) => {
            return <CalculatorButton key={key}>{key}</CalculatorButton>;
          })}
        </Grid>
      </View>
    </View>
  );
}
