import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountPage = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.whiteText]}>Coming Soon! 😊</Text>
    </View>
  );
};

export default AccountPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#051b25",
  },
  whiteBg: { backgroundColor: "white" },
  darkBg: { backgroundColor: "black" },
  whiteText: { color: "#f5eedd" },
  darkText: { color: "black" },
});
