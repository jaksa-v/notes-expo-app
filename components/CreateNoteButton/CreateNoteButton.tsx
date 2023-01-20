import { View } from "../../components/Themed";
import { Pressable } from "react-native";
import shadows from "../../constants/shadows";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import { TabOneStackScreenProps } from "../../types";

export default function CreateNoteButton({
  navigation,
}: TabOneStackScreenProps<"Root">) {
  return (
    <View style={[styles.container, shadows.shadowSm]}>
      <Pressable onPress={() => navigation.navigate("Note")}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    </View>
  );
}
