import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import { supabase } from "../../lib/supabase";
import { RootStackScreenProps } from "../../types";
import styles from "./styles";
import { width, height } from "../../constants/Layout";
import Animated, { withSequence, withSpring } from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import useAuthAnimations from "./useAuthAnimations";
import shadows from "../../constants/shadows";

export default function Auth({ navigation }: RootStackScreenProps<"Auth">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    imageAnimatedStyle,
    buttonsAnimatedStyle,
    closeButtonContainerStyle,
    formAnimatedStyle,
    formButtonAnimatedStyle,
    imagePosition,
    formButtonScale,
  } = useAuthAnimations();

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
      setPasswordConfirm("");
      navigation.navigate("Root");
    }
  }

  const loginHandler = () => {
    imagePosition.value = 0;
    setRegister(false);
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    setRegister(true);
  };

  const closeButtonHandler = () => {
    imagePosition.value = 1;
    Keyboard.dismiss();
  };

  const formSubmitHandler = () => {
    formButtonScale.value = withSequence(withSpring(1.25), withSpring(1));

    if (register) {
      signUpWithEmail();
    } else {
      signInWithEmail();
    }
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      imagePosition.value = -1;
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      imagePosition.value = 0;
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={height + 20} width={width}>
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 20} />
          </ClipPath>
          <Image
            href={require("../../assets/images/login-background.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <Animated.View
          style={[
            styles.closeButtonContainer,
            closeButtonContainerStyle,
            shadows.shadowMd,
          ]}
        >
          <Text onPress={closeButtonHandler}>
            <AntDesign
              name="close"
              size={24}
              color="rgba(123, 104, 238, 0.8)"
            />
          </Text>
        </Animated.View>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[
            styles.formInputContainer,
            formAnimatedStyle,
            StyleSheet.absoluteFill,
          ]}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
            secureTextEntry={true}
          />
          {register && (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="rgba(0, 0, 0, 0.4)"
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
              style={styles.textInput}
              secureTextEntry={true}
            />
          )}
          <Animated.View
            style={[styles.button, shadows.shadowSm, formButtonAnimatedStyle]}
          >
            <Pressable onPress={formSubmitHandler} disabled={loading}>
              <Text style={styles.buttonText}>
                {register ? "REGISTER" : "LOGIN"}
              </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
