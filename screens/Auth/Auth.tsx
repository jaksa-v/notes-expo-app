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
import Layout from "../../constants/Layout";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Layout.window;

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

  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [-1, 0, 1],
      [(-height * 3) / 4, -height / 2, 0]
    );

    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        {
          translateY: withTiming(interpolation, { duration: 1000 }),
        },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(`${interpolation}deg`, { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value < 1
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

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
          style={[styles.closeButtonContainer, closeButtonContainerStyle]}
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
            placeholderTextColor="black"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.textInput}
          />
          {register && (
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="black"
              value={passwordConfirm}
              onChangeText={(text) => setPasswordConfirm(text)}
              style={styles.textInput}
            />
          )}
          <Animated.View
            style={[styles.button, styles.shadow, formButtonAnimatedStyle]}
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
