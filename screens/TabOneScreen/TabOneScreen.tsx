import { useQuery } from "@tanstack/react-query";
import CreateNoteButton from "../../components/CreateNoteButton/CreateNoteButton";
import NoteCard from "../../components/NoteCard/NoteCard";

import { View } from "../../components/Themed";
import { Database } from "../../lib/database.types";
import { getNotes } from "../../lib/notesFunctions";
import { TabOneStackScreenProps } from "../../types";
import styles from "./styles";

export default function TabOneScreen({
  navigation,
  route,
}: TabOneStackScreenProps<"Root">) {
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: () => getNotes(),
  });

  function handleNotePress(note: Database["public"]["Tables"]["notes"]["Row"]) {
    navigation.navigate("Note", {
      note,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        {notes?.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            handleNotePress={() => handleNotePress(note)}
          />
        ))}
        <CreateNoteButton navigation={navigation} route={route} />
      </View>
    </View>
  );
}
