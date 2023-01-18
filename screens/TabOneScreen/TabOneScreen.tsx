import { useState, useEffect } from "react";
import { Alert, Pressable } from "react-native";
import NoteCard from "../../components/NoteCard/NoteCard";

import { Text, View } from "../../components/Themed";
import { Database } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";
import { RootTabScreenProps } from "../../types";
import styles from "./styles";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [notes, setNotes] =
    useState<Database["public"]["Tables"]["notes"]["Row"][]>();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert(error.message);
    } else {
      navigation.navigate("Auth");
    }
  }

  async function getNotes() {
    const { data, error } = await supabase.from("notes").select("*").limit(10);

    if (error) {
      Alert.alert(error.message);
    } else {
      console.log("Data: ", data);
      setNotes(data);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable onPress={signOut} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
      <View style={styles.notesContainer}>
        {notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </View>
    </View>
  );
}
