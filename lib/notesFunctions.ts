import { supabase } from "./supabase";

export async function getNotes() {
  try {
    const response = await supabase
      .from("notes")
      .select("*")
      .limit(10)
      .order("updated_at", { ascending: false });
    return response.data;
  } catch {
    throw new Error("Error getting notes");
  }
}

export async function updateNote(title: string, content: string, id: number) {
  try {
    const response = await supabase
      .from("notes")
      .update({ title, content })
      .eq("id", id)
      .select();
    return response.data;
  } catch {
    throw new Error("Error updating note");
  }
}

export async function createNote(title: string, content: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  try {
    if (user) {
      const response = await supabase
        .from("notes")
        .insert({ author_id: user.id, title, content });
      return response.data;
    } else {
      throw new Error("Error creating note");
    }
  } catch (error) {
    throw new Error("Error creating note");
  }
}
