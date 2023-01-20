import { TextInput, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import { TabOneStackScreenProps } from "../../types";
import { useState } from "react";

import styles from "./styles";
import { supabase } from "../../lib/supabase";

export default function NoteScreen({ route }: TabOneStackScreenProps<"Note">) {
  const noteExists = route.params?.note ? true : false;
  const note = route.params?.note;
  const [content, onChangeContent] = useState(note?.content ?? "");
  const [title, onChangeTitle] = useState(note?.title ?? "New Note");

  async function handlePress() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (noteExists) {
        try {
          const { data, error } = await supabase
            .from("notes")
            .update({ title, content })
            .eq("id", note?.id)
            .select();
          console.log(data, error);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const { data, error } = await supabase
            .from("notes")
            .insert({ author_id: user?.id, title, content });
          console.log(data, error);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("User not logged in");
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
