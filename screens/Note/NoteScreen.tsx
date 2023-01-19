import { Text, View } from "../../components/Themed";
import { TabOneStackScreenProps } from "../../types";

import styles from "./styles";

export default function NoteScreen({ route }: TabOneStackScreenProps<"Note">) {
  const { note } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
    </View>
  );
}
