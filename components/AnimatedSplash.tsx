import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { cn } from "@/lib/utils";

const AnimatedSplash = ({
  onAnimationFinish,
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) => {
//   const [backgroundColor, setBackgroundColor] = useState("#ffff");
  const animation = useRef<LottieView>(null);
//   const { width } = Dimensions.get("window");
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      style={{
        flex: 1,
      }}
    >
      <LottieView
        onAnimationFinish={onAnimationFinish}
        ref={animation}
        loop={false}
        autoPlay
        style={[
          {
            width: "100%",
            height: "100%",
            flex: 1,
          },
        ]}
        source={require("@/assets/images/splash.json")}
      />
    </Animated.View>
  );
};

export default AnimatedSplash;
