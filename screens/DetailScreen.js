import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  Text,
  Image,
  View,
  StyleSheet
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import NavigationService from "../utils/NavigationService";
import getSaloons from "../api";
import { MillerText } from "../components/StyledText";
import { renderFilledStars, renderOutlineStars } from "../utils/renderStars";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";

export default function DetailScreen() {
  let saloonName = NavigationService.navi().state.nav.routes[1].params.name;
  const [saloon, setSaloon] = useState({});
  useEffect(() => {
    (async function() {
      let data = await getSaloons();
      data.forEach(function(saloon) {
        if (saloon.name == saloonName) {
          setSaloon(saloon);
        }
      });
    })();
  }, []);

  return (
    <ScrollView>
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/images/girl-hair.png")}
          style={{
            // resizeMode: 'contain',
            height: 250,
            flex: 1,
            width: null
          }}
        ></Image>
        <Text
          style={{
            position: "absolute",
            bottom: 0,
            padding: 10,
            color: "white"
          }}
        >
          <MillerText style={{ fontSize: 30 }}>{saloonName}</MillerText>
          {"\n"}
          {saloon.avgRating && renderFilledStars(saloon.avgRating)}
          {saloon.avgRating && renderOutlineStars(saloon.avgRating)}
          <Text style={{ fontWeight: "100", fontSize: 11 }}>
            {" "}
            ({saloon.ratings})
          </Text>
        </Text>
      </View>

      <View
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: "50%",
            paddingBottom: 10,
            borderBottomWidth: 1.5,
            borderBottomColor: Colors.tintColor
          }}
        >
          <TouchableOpacity>
            <Text style={{ textAlign: "center" }}>Info</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "50%", paddingBottom: 10 }}>
          <TouchableOpacity>
            <Text style={{ textAlign: "center" }}>Schema</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.infoItem}>
        <EvilIcons name="location" size={31}></EvilIcons>
        <Text style={styles.infoItemText}>
          {saloon.address && saloon.address.street},{" "}
          {saloon.address && saloon.address.city}
        </Text>
      </View>

      {/* Time */}
      <View style={styles.infoItem}>
        <EvilIcons name="clock" size={31}></EvilIcons>
        <Text style={styles.infoItemText}>
          Öppet till {saloon.time && saloon.time.close} idag{" "}
          <EvilIcons
            name="chevron-down"
            color={Colors.tintColor}
            size={31}
          ></EvilIcons>
        </Text>
      </View>

      {/* Phone */}
      <View style={styles.infoItem}>
        <Feather name="phone" size={21} style={{ paddingLeft: 6 }}></Feather>
        <Text style={{ ...styles.infoItemText, paddingLeft: 12 }}>
          {saloon.phone}
        </Text>
      </View>

      {/* Webpage */}
      <View style={styles.infoItem}>
        <Ionicons
          name="ios-globe"
          size={25}
          style={{ paddingLeft: 6 }}
        ></Ionicons>
        <Text style={{ ...styles.infoItemText, paddingLeft: 12 }}>
          {saloon.website}
        </Text>
      </View>

      {/* Description */}
      <View style={{ ...styles.infoItem, borderBottomWidth: 0 }}>
        <Text style={{ ...styles.infoItemText, fontSize: 14 }}>
          {saloon.description}
        </Text>
      </View>

      <Button
        onPress={() => {
          WebBrowser.openBrowserAsync("https://calendly.com/");
        }}
        title="Book now"
      ></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoItem: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey",
    padding: 6,
    paddingTop: 0,
    margin: 10,
    marginTop: 0
  },
  infoItemText: {
    paddingLeft: 7,
    fontSize: 19,
    fontWeight: "300"
  }
});

DetailScreen.navigationOptions = {
  headerRight: (
    <Feather
      name="heart"
      size={21}
      style={{
        paddingRight: 10
      }}
      onPress={() => alert("Ohh yea my favorite salooooooon")}
    ></Feather>
  )
};
