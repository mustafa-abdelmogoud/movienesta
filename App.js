import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TrendyScreen from "./screens/TrendyScreen";
import UpcomingScreen from "./screens/UpcomingScreen";
import PopularScreen from "./screens/PopularScreen";
import DetailsScreen from "./screens/DetailsScreen";
import Toolbar from "./components/toolbar";

const { width } = Dimensions.get("window");
const Tab = createMaterialTopTabNavigator();

const Main = () => {
  return (
    <View style={styles.app}>
      <ImageBackground
        source={require("./background.png")}
        style={styles.background}
      >
        <Toolbar />
        <View style={styles.body}>
          <Tab.Navigator
            sceneContainerStyle={{
              backgroundColor: "transparent"
            }}
            tabBarOptions={{
              style: {
                backgroundColor: "transparent"
              }
            }}
          >
            <Tab.Screen name="Trendy" component={TrendyScreen} />
            <Tab.Screen name="Upcoming" component={UpcomingScreen} />
            <Tab.Screen name="Popular" component={PopularScreen} />
          </Tab.Navigator>
        </View>
      </ImageBackground>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        sceneContainerStyle={{
          backgroundColor: "transparent"
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={Main}
        />
        <Stack.Screen
          options={{
            title: null,
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: "#000"
            }
          }}
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#000"
  },
  background: {
    flex: 1,
    width,
    height: 450 // TODO:: find a solution for image resizing
  },
  body: {
    flex: 1,
    backgroundColor: "transparent"
  }
});
