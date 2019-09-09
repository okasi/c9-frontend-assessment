
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

import { Ionicons } from '@expo/vector-icons';

import { MillerText } from "../components/StyledText";
import NavigationService from "../utils/NavigationService";
import Constants from "expo-constants";
import getSaloons from "../api";

export default function StartScreen() {
  const [saloons, setSaloons] = useState({});
  useEffect(() => {
    (async function () {
      let data = await getSaloons();
      setSaloons(data);
      console.log(data);
    })();
  }, []);

  return (
    <View>
      <ScrollView>
        {saloons.length > 0 &&
          saloons.map(saloon => {
            function renderFilledStars(stars) {
              return (
                Array(stars).fill(<Ionicons name="ios-star" />)
              )
            }
            function renderOutlineStars(stars) {
              return (
                Array(5 - stars).fill(<Ionicons name="ios-star-outline" />)
              )
            }
            return (
              <>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate("Detail", { name: saloon.name })}
                >
                  <Text>{"\n"}</Text>
                  <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>


                    <View>
                      <Text>
                        {saloon.time.open} - {saloon.time.close}
                      </Text>
                    </View>

                    <View>
                      <Text>
                        <MillerText>{saloon.name}</MillerText>
                        {"\n"}
                        {renderFilledStars(saloon.avgRating)}
                        {renderOutlineStars(saloon.avgRating)}
                        ({saloon.ratings})
                        {"\n"}
                        {saloon.address.street}
                      </Text>
                    </View>

                    <View>
                      <Text>
                        {saloon.price} kr
                        {"\n"}
                        {saloon.duration} min
                      </Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </>
            );
          })}
      </ScrollView >
    </View >
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

StartScreen.navigationOptions = {
  title: Constants.manifest.name
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "50%"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  logoImage: {
    width: 100,
    height: 80,
    resizeMode: "contain"
    // marginTop: 3,
    // marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  StartScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
