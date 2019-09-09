import { createAppContainer, createStackNavigator } from "react-navigation";

import navContent from "./navContent";

export default createAppContainer(createStackNavigator(...navContent));
