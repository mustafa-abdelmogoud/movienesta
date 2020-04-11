import React from "react";
import { Dimensions, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

export default function({ uri }) {
  return (
    <WebView
      style={{ width, height: height / 2 }}
      javaScriptEnabled={true}
      source={{
        uri
      }}
    />
  );
}
