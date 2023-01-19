import { useState, useEffect } from "react";
import { Alert } from "react-native";
import CreateNoteButton from "../../components/CreateNoteButton/CreateNoteButton";
import NoteCard from "../../components/NoteCard/NoteCard";

import { Text, View } from "../../components/Themed";
import { Database } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";
import { TabOneStackScreenProps } from "../../types";
import styles from "./styles";

export default function TabOneScreen({
  navigation,
  route,
}: TabOneStackScreenProps<"Root">) {
  const [notes, setNotes] =
    useState<Database["public"]["Tables"]["notes"]["Row"][]>();

  async function getNotes() {
    const { data, error } = await supabase.from("notes").select("*").limit(10);

    if (error) {
      Alert.alert(error.message);
    } else {
      setNotes(data);
    }
  }

  function handleNotePress(note: Database["public"]["Tables"]["notes"]["Row"]) {
    navigation.navigate("Note", {
      note,
    });
  }

  useEffect(() => {
    getNotes();
  }, []);

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
