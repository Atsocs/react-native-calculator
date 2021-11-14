import React from "react";

import Grid from "./Grid";
import CalculatorButton from "./CalculatorButton";
import keys from "./CalculatorKeys";
import { View } from "react-native";

export default function CalculatorButtons({ style }) {
  return (
    <View style={style}>
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
  );
}
