import { StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { supabase } from "../lib/supabase";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
    } else {
      navigation.navigate("Auth");
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={signOut} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
