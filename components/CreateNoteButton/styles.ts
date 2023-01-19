import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});

export default styles;
