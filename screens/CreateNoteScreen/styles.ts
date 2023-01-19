import { StyleSheet } from "react-native";
import { height, statusBarHeight, width } from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    marginTop: statusBarHeight + 16,
  },
});

export default styles;
