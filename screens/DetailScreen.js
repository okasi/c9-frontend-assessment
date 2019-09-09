import React from "react";
import { ScrollView, StyleSheet, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";

export default function DetailScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <Button
        onPress={() => {
          WebBrowser.openBrowserAsync(
            "https://calendly.com/"
          );

        }}
        title="Book now">

      </Button>
    </ScrollView>
  );
}

DetailScreen.navigationOptions = {
  title: "Links"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});