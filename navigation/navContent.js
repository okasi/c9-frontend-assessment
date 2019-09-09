import React from "react";
import { View } from "react-native";
import StartScreen from "../screens/StartScreen";
import DetailScreen from "../screens/DetailScreen";
export default [
  {
    Start: StartScreen,
    Detail: {
      screen: DetailScreen,
      path: "detail/:name",
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}`
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: "miller-banner",
        fontWeight: "bold"
      }
    }
  }
];
