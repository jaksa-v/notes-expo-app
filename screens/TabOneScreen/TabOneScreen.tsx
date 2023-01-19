import { useState, useEffect } from "react";
import { Alert, Pressable } from "react-native";
import NoteCard from "../../components/NoteCard/NoteCard";

import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import shadows from "../../constants/shadows";
import { Database } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
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

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.notesContainer}>
        {notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </View>
    </View>
  );
}
