import { StyleSheet } from "react-native";
import { height } from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    width: "48%",
    // backgroundColor: "lightblue",
    borderRadius: 12,
    padding: 8,
    marginVertical: "2%",
    height: height / 4,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  contentText: {
    fontFamily: "Montserrat_400Regular",
  },
});

export default styles;
