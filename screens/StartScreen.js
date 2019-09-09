import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MillerText } from "../components/StyledText";
import { renderFilledStars, renderOutlineStars } from "../utils/renderStars";
import NavigationService from "../utils/NavigationService";
import getSaloons from "../api";
import Constants from "expo-constants";
import Colors from "../constants/Colors";

export default function StartScreen() {
  const [saloons, setSaloons] = useState({});
  useEffect(() => {
    (async function() {
      let data = await getSaloons();
      setSaloons(data);
      // console.log(data);
    })();
  }, []);

  return (
    <View>
      <ScrollView>
        {saloons.length > 0 &&
          saloons.map(saloon => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    NavigationService.navigate("Detail", { name: saloon.name })
                  }
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      paddingTop: 12.5,
                      paddingBottom: 5,
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.tintColor
                    }}
                  >
                    <View style={{ width: "20%" }}>
                      <Text>
                        {saloon.time.open} - {saloon.time.close}
                      </Text>
                    </View>

                    <View style={{ width: "60%" }}>
                      <Text>
                        <MillerText style={{ fontSize: 18 }}>
                          {saloon.name}
                        </MillerText>
                        {"\n"}
                        {renderFilledStars(saloon.avgRating)}
                        {renderOutlineStars(saloon.avgRating)}
                        <Text style={{ fontWeight: "100", fontSize: 11 }}>
                          {" "}
                          ({saloon.ratings})
                        </Text>
                        {"\n"}
                        <Text style={{ fontWeight: "200" }}>
                          {saloon.address.street}
                        </Text>
                      </Text>
                    </View>

                    <View style={{ width: "15%" }}>
                      <Text>
                        {saloon.price} kr
                        {"\n"}
                        {"\n"}
                        <Text style={{ fontWeight: "100", fontSize: 11 }}>
                          {saloon.duration} min
                        </Text>
                      </Text>
                    </View>

                    <View style={{ width: "5%", alignSelf: "center" }}>
                      <Feather name="chevron-right" color={Colors.tintColor} />
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          })}
      </ScrollView>
    </View>
  );
}

StartScreen.navigationOptions = {
  title: Constants.manifest.name
};
