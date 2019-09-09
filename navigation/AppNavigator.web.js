import { createBrowserApp } from "@react-navigation/web";
import { createStackNavigator } from "react-navigation";

import navContent from "./navContent";

const stackNavigator = createStackNavigator(...navContent);
stackNavigator.path = "";

export default createBrowserApp(stackNavigator, { history: "hash" });
