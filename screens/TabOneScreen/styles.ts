import { StyleSheet } from "react-native";
import { statusBarHeight } from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: "white",
  },
  signOutButton: {
    backgroundColor: "#f194ff",
    borderRadius: 20,
    padding: 12,
    marginTop: statusBarHeight + 4,
    marginRight: 16,
    alignSelf: "flex-end",
  },
  notesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default styles;
