import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const LoadingSpinner = ({
  visible,
  text,
}: {
  visible: boolean;
  text?: string;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.7,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <Spinner
      customIndicator={
        <Animated.Image
          source={require("@/assets/images/icon_bg-less.png")}
          style={[
            {
              width: 100,
              height: 100,
            },
            ,
            { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
          ]}
        />
      }
      visible={visible}
      textStyle={styles.spinnerTextStyle}
    />
  );
};

export default LoadingSpinner;
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "white",
  },
});
