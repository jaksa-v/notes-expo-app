import { Text, View } from "../../components/Themed";
import { Database } from "../../lib/database.types";

import styles from "./styles";

export default function NoteCard({
  note,
}: {
  note: Database["public"]["Tables"]["notes"]["Row"];
}) {
  return (
    <View key={note.id} style={styles.container}>
      <Text style={styles.titleText}>{note.title}</Text>
      <Text style={styles.contentText}>{note.content}</Text>
    </View>
  );
}
