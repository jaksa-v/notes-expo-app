import { TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { TabOneStackScreenProps } from "../../types";
import { useState } from "react";

import styles from "./styles";
import { supabase } from "../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote, updateNote } from "../../lib/notesFunctions";
import { AntDesign } from "@expo/vector-icons";

export default function NoteScreen({
  route,
  navigation,
}: TabOneStackScreenProps<"Note">) {
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
  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(note!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  async function handleSave() {
    if (noteExists) {
      updateMutation.mutate();
      navigation.goBack();
    } else {
      createMutation.mutate();
      navigation.goBack();
    }
  }

  async function handleDelete() {
    if (noteExists) {
      deleteMutation.mutate();
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={onChangeTitle}
        />
        <Pressable onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
      <TextInput
        style={styles.content}
        value={content}
        onChangeText={onChangeContent}
        multiline={true}
      />
      <Pressable onPress={handleSave}>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </View>
      </Pressable>
    </View>
  );
}
