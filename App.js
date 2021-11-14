import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import store from "./src/store";
import Calculator from "./src/Calculator";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Calculator />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
