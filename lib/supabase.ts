import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = "https://jciuefadloasugoekrpb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjaXVlZmFkbG9hc3Vnb2VrcnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM5NDg2NDcsImV4cCI6MTk4OTUyNDY0N30.V9zfzX09U0jGabxivd_iLOPiIWfmfINJi_oL4j1Neb4";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
