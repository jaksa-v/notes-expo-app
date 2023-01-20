import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteScreen from "../screens/Note/NoteScreen";
import TabOneScreen from "../screens/TabOneScreen/TabOneScreen";
import { TabOneStackParamList } from "../types";

const Stack = createNativeStackNavigator<TabOneStackParamList>();

export default function TabOneStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="Root"
        component={TabOneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Note"
        component={NoteScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
