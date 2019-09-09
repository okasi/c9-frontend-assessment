import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export function renderFilledStars(stars) {
  let arr = Array(stars);

  for (let i = 0; i < stars; i++) {
    arr.push(<Ionicons name="ios-star" key={i} color={Colors.tintColor} />);
  }
  return arr;
}
export function renderOutlineStars(stars) {
  let arr = Array(5 - stars);

  for (let i = 0; i < 5 - stars; i++) {
    arr.push(
      <Ionicons name="ios-star-outline" key={i} color={Colors.tintColor} />
    );
  }
  return arr;
}
