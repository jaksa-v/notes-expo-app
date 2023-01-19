import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateNoteScreen from "../screens/CreateNoteScreen/CreateNoteScreen";
import NoteScreen from "../screens/Note/NoteScreen";
import TabOneScreen from "../screens/TabOneScreen/TabOneScreen";
import { TabOneStackParamList } from "../types";

const Stack = createNativeStackNavigator<TabOneStackParamList>();

export default function TabOneStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNote"
        component={CreateNoteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
