import React, { ReactNode, useRef, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  TextInputFocusEventData,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Animated } from "react-native";
import { NativeSyntheticEvent } from "react-native";
import { Colors } from "@/constants/Colors";

export enum INPUT_TYPE {
  TEXT = "TEXT",
  PASSWORD = "PASSWORD",
}
export interface IInputProps extends TextInputProps {
  label?: string;
  type?: INPUT_TYPE;
  placeHolder?: string;
  error?: string | false | undefined;
  icon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  bottomSheet?: boolean;
  handleIconPress?: () => void;
  handleSubmit?: () => void;
  search?: boolean;
  labelAnimated?: string;
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  placeHolder,
  error,
  icon,
  disabled,
  required,
  handleIconPress,
  bottomSheet,
  search,
  onChangeText,
  onBlur,
  labelAnimated,

  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const [text, setText] = useState("");
  const handleFocus = () => {
    setIsFocused(true);
    animatedLabel(1);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
    if (!text) {
      animatedLabel(0);
    }
  };
  const animatedLabel = (toValue: number) => {
    Animated.timing(labelPosition, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current;

  const labelStyle = {
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 5],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ["#A7A3B3", "#A7A3B3"],
    }),
  };

  const handleTextChange = (text: string) => {
    setText(text);
    if (onChangeText) {
      onChangeText(text);
    }
    if (text) {
      animatedLabel(1);
    } else {
      animatedLabel(isFocused ? 1 : 0);
    }
  };
  return (
    <View
      className={`relative gray flex-col  px-1  h-14  mt-1 rounded-xl w-full `}
    >
      <View
        className={`relative flex-col bg-gray px-1   h-14  mt-1 rounded-xl w-full"}  ${
          isFocused && "border border-primary"
        }`}
      >
        {labelAnimated && (
          <Animated.Text
            style={[labelStyle]}
            className="text-sm  font-normal text-[#A7A3B3]"
          >
            {labelAnimated} {required && <Text>*</Text>}
          </Animated.Text>
        )}
        <View
          className={`flex-row justify-between px-2 ${
            !labelAnimated && " items-center h-full "
          }`}
        >
          {icon ||
            (search && (
              <Pressable onPress={handleIconPress}>
                <Text className="text-[#667085]">
                  {search ? (
                    <Ionicons name="search-sharp" size={24} color="#909090" />
                  ) : (
                    icon
                  )}
                </Text>
              </Pressable>
            ))}
          {bottomSheet ? (
            <BottomSheetTextInput
              editable={!disabled}
              style={{
                borderRadius: 8,
                height: "100%",
                paddingBottom: 8,
                width: "100%",
                color: Colors.primary,
                fontSize: 18,
              }}
              placeholder={placeHolder}
              onFocus={() => {
                handleFocus();
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              onChangeText={handleTextChange}
              secureTextEntry={type === INPUT_TYPE.PASSWORD}
              {...props}
            />
          ) : (
            <TextInput
              editable={!disabled}
              className={`${
                icon || search ? "w-[85%]" : "w-[90%]"
              } h-full text-base text-primary `}
              placeholder={placeHolder}
              onFocus={() => {
                handleFocus();
              }}
              onBlur={(e) => {
                handleBlur(e);
              }}
              onChangeText={handleTextChange}
              secureTextEntry={type === INPUT_TYPE.PASSWORD}
              {...props}
            />
          )}
        </View>
      </View>
      {error && <Text className="text-[10px] text-red-600">{error}</Text>}
    </View>
  );
};

export default Input;
