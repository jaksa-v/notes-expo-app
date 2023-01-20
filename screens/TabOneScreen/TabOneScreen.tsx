import { useQuery } from "@tanstack/react-query";
import CreateNoteButton from "../../components/CreateNoteButton/CreateNoteButton";
import NoteCard from "../../components/NoteCard/NoteCard";
import { FlatList } from "react-native";
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

  function separator() {
    return <View style={{ padding: 8, backgroundColor: "transparent" }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        <FlatList
          data={notes}
          keyExtractor={(note) => note.id.toString()}
          renderItem={({ item: note }) => (
            <NoteCard
              note={note}
              handleNotePress={() => handleNotePress(note)}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={separator}
          contentContainerStyle={{ padding: 16 }}
        />
        <CreateNoteButton navigation={navigation} route={route} />
      </View>
    </View>
  );
}
