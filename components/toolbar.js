import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

export default function() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Movienesta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Constants.statusBarHeight,
    alignItems: "center"
  },
  title: {
    color: "#000",
    fontSize: 26,
    fontWeight: "bold"
  }
});
