import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";

const { width, height } = Layout.window;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "rgba(123, 104, 238, 0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 36,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    fontWeight: "bold",
    color: "white",
    letterSpacing: 0.5,
  },
  buttonContainer: {
    justifyContent: "center",
    height: height / 3,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 20,
    paddingLeft: 12,
    fontFamily: "Montserrat_400Regular",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 72,
    zIndex: -1,
    justifyContent: "center",
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 20,
    top: -20,
  },
});

export default styles;
