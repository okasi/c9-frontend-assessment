import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";

export function renderFilledStars(stars) {
  return (
    Array(stars).fill(<Ionicons name="ios-star" color={Colors.tintColor} />)
  )
}
export function renderOutlineStars(stars) {
  return (
    Array(5 - stars).fill(<Ionicons name="ios-star-outline" color={Colors.tintColor} />)
  )
}