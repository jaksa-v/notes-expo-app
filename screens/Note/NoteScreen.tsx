import { Text, View } from "../../components/Themed";
import { TabOneStackScreenProps } from "../../types";

import styles from "./styles";

export default function NoteScreen({ route }: TabOneStackScreenProps<"Note">) {
  const { note } = route.params;
  return (
    <View style={styles.container}>
      <Text>{note.title}</Text>
      <Text>{note.content}</Text>
    </View>
  );
}
