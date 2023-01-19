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
  },
  signOutButton: {
    borderRadius: 20,
    padding: 12,
    marginTop: statusBarHeight + 4,
    marginBottom: 4,
    marginRight: 16,
    alignSelf: "flex-end",
  },
});

export default styles;
