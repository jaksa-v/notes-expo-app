import { TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { TabOneStackScreenProps } from "../../types";
import { useState } from "react";

import styles from "./styles";
import { supabase } from "../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, updateNote } from "../../lib/notesFunctions";

export default function NoteScreen({ route }: TabOneStackScreenProps<"Note">) {
  const noteExists = route.params?.note ? true : false;
  const note = route.params?.note;
  const [content, onChangeContent] = useState(note?.content ?? "");
  const [title, onChangeTitle] = useState(note?.title ?? "New Note");

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: () => updateNote(title, content, note!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
  const createMutation = useMutation({
    mutationFn: () => createNote(title, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  async function handlePress() {
    if (noteExists) {
      updateMutation.mutate();
    } else {
      createMutation.mutate();
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={onChangeTitle}
      />
      <TextInput
        style={styles.content}
        value={content}
        onChangeText={onChangeContent}
        multiline={true}
      />
      <Pressable onPress={handlePress}>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </View>
      </Pressable>
    </View>
  );
}
