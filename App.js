import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons, Feather, EvilIcons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";
import NavigationService from "./utils/NavigationService";

import Layout from "./constants/Layout";

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function getContainerStyle() {
    if (Layout.isWide) {
      return {
        width: "40%",
        margin: "0 auto",
        position: "fixed",
        right: "0",
        left: "0",
        marginRight: "auto",
        marginLeft: "auto",
        backgroundColor: "#fff"
      };
    } else {
      return {
        flex: 1,
        backgroundColor: "#fff"
      };
    }
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={{ flex: "1" }}>
        <View style={getContainerStyle()}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </View>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/images/girl-hair.png"),
      require("./assets/images/salong.png"),
      require("./assets/images/icon.png")
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      ...Feather.font,
      ...EvilIcons.font,

      "miller-banner": require("./assets/fonts/MillerBanner-Light.otf")
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
