import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Picker } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MillerText } from "../components/StyledText";
import { renderFilledStars, renderOutlineStars } from "../utils/renderStars";
import NavigationService from "../utils/NavigationService";
import getSaloons from "../api";
import Constants from "expo-constants";
import Colors from "../constants/Colors";

let toggleFilterBool = false;
function toggleFilter() {
  toggleFilterBool = !toggleFilterBool;
  // alert(toggleFilterBool);
}

export default function StartScreen() {
  const [saloons, setSaloons] = useState({});
  useEffect(() => {
    (async function() {
      let data = await getSaloons();
      setSaloons(data);
    })();
  }, []);

  // const [toggleFilterBool, setToggleFilterBool] = useState(false);

  const [filterInterval, setFilterInterval] = useState(0);

  return (
    <View>
      <ScrollView>
        <Picker
          style={{ marginTop: 10 }}
          onValueChange={itemValue => setFilterInterval(itemValue)}
        >
          <Picker.Item label="0 - ∞" value="0" />
          <Picker.Item label="0 - 300 SEK" value="300" />
          <Picker.Item label="0 - 350 SEK" value="350" />
        </Picker>
        {saloons.length > 0 &&
          saloons.map(saloon => {
            if (filterInterval == 0 || saloon.price <= filterInterval) {
              return (
                <View key={saloon.name}>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate("Detail", {
                        name: saloon.name
                      })
                    }
                  >
                    <View
                      style={{
                        // display: "flex",
                        flexDirection: "row",
                        paddingTop: 12.5,
                        paddingBottom: 5,
                        borderBottomWidth: 0.5,
                        borderBottomColor: Colors.tintColor
                      }}
                    >
                      <View style={{ width: "20%" }}>
                        <Text>
                          {" "}
                          {saloon.time.open}
                          {"\n"} -{"\n"} {saloon.time.close}
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
                        <Feather
                          name="chevron-right"
                          color={Colors.tintColor}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
      </ScrollView>
    </View>
  );
}

StartScreen.navigationOptions = {
  title: Constants.manifest.name

  // Figure this out without any statehandler

  // headerRight: (
  //   <Ionicons
  //     name="ios-options"
  //     size={21}
  //     style={{
  //       paddingRight: 10
  //     }}
  //     onPress={() => toggleFilter()}
  //   ></Ionicons>
  // )
};
