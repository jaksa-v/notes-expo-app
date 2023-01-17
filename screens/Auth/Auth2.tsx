import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import Colors from "../../constants/Colors";
import { supabase } from "../../lib/supabase";
import { RootStackScreenProps } from "../../types";
import styles from "./styles";

export default function Auth({ navigation }: RootStackScreenProps<"Auth">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    } else {
      setEmail("");
      setPassword("");
      navigation.navigate("Root");
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert(error.message);
    } else {
      setEmail("");
      setPassword("");
      navigation.navigate("Root");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.authForm}>
        <Text style={styles.headerText}>Welcome</Text>
        <View style={{ marginTop: 8 }}>
          <TextInput
            style={styles.authInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={"none"}
          />
          <TextInput
            style={styles.authInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="password"
            autoCapitalize={"none"}
          />
          {register && (
            <TextInput
              style={styles.authInput}
              onChangeText={(text) => setPasswordConfirm(text)}
              value={passwordConfirm}
              secureTextEntry={true}
              placeholder="confirm password"
              autoCapitalize={"none"}
            />
          )}
        </View>

        {register ? (
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              style={styles.authButton}
              disabled={loading}
              onPress={() => signUpWithEmail()}
            >
              <Text style={styles.authButtonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              onPress={() => setRegister(false)}
            >
              <Text style={styles.linkText}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              style={styles.authButton}
              disabled={loading}
              onPress={() => signInWithEmail()}
            >
              <Text style={styles.authButtonText}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              onPress={() => setRegister(true)}
            >
              <Text style={styles.linkText}>
                Don't have an account? Sign up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
