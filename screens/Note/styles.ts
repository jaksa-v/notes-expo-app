import { StyleSheet } from "react-native";
import { height, statusBarHeight, width } from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
  },
  content: {
    marginVertical: 16,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    flex: 1,
    textAlignVertical: "top",
  },
  saveButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 3,
  },
  saveButtonText: {
    fontSize: 20,
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
});

export default styles;
