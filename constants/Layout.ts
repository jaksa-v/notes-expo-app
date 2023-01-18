import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height + getStatusBarHeight();
export const statusBarHeight = getStatusBarHeight();
export const isSmallDevice = width < 375;
