import React from "react";
import { View } from "react-native";

export default function Grid({ children: ch, rows, cols, style }) {
  let children = React.Children.toArray(ch);
  const len = children.length;
  if (len !== rows * cols) {
    console.error(
      `Grid has ${len} children, but ${rows} rows and ${cols} cols`
    );
  }

  const elements = [...Array(rows).keys()].map((row) =>
    children.slice(row * cols, (row + 1) * cols)
  );

  return (
    <View style={style}>
      {elements.map((row, index) => (
        <View key={index} style={{ flex: 1, flexDirection: "row" }}>
          {row}
        </View>
      ))}
    </View>
  );
}
