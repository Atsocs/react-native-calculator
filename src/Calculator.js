import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CalculatorButtons from "./CalculatorButtons";

export default function Calculator() {
  const visorText = useSelector((state) => state.visor);
  return (
    <View style={styles.container}>
      <View style={styles.visor}>
        <Text style={styles.visorText}>{visorText}</Text>
      </View>
      <CalculatorButtons style={styles.buttons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  visor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  visorText: { fontSize: 30 },
  buttons: {
    flex: 2,
    justifyContent: "center",
    alignItems: "stretch",
  },
});
