import { Text, View } from "../../components/Themed";
import shadows from "../../constants/shadows";
import { Database } from "../../lib/database.types";
import { TabOneStackScreenProps } from "../../types";
import { Pressable } from "react-native";

import styles from "./styles";

export default function NoteCard({
  note,
  handleNotePress,
}: {
  note: Database["public"]["Tables"]["notes"]["Row"];
  handleNotePress: () => void;
}) {
  return (
    <View key={note.id} style={[styles.container, shadows.shadowMd]}>
      <Pressable onPress={handleNotePress}>
        <View style={styles.content}>
          <Text style={styles.titleText}>{note.title}</Text>
          <Text style={styles.contentText}>{note.content}</Text>
        </View>
      </Pressable>
    </View>
  );
}
