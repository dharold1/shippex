import React, { ReactNode } from "react";
import { ButtonProps, Text, TextProps, TouchableOpacity } from "react-native";
import { cn } from "@/lib/utils";

interface BtnProps {
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  _labelClassName?: string;
  children: ReactNode;
  className?: string;
  onPress?: () => void;
  disabled?: boolean;
}
const Button = ({
  children,
  className,
  iconLeft,
  iconRight,
  _labelClassName,
  onPress,
  disabled,
  ...props
}: BtnProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      {...props}
      className={cn(
        `bg-primary h-12 rounded-xl flex-row items-center justify-center space-x-3   px-4 py-2`,
        className
      )}
    >
      {iconLeft}
      <Text className={cn(`text-white text-center text-lg `, _labelClassName)}>
        {children}
      </Text>
      {iconRight}
    </TouchableOpacity>
  );
};

export default Button;
