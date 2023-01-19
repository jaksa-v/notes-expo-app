import { Alert, Pressable } from "react-native";

import { Text, View } from "../../components/Themed";
import shadows from "../../constants/shadows";
import { supabase } from "../../lib/supabase";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

export default function TabTwoScreen({
  navigation,
}: RootTabScreenProps<"TabTwo">) {
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
      <View style={[styles.signOutButton, shadows.shadowSm]}>
        <Pressable onPress={signOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
