import { Colors } from "@/constants/Colors";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CheckBox = ({
  checked,
  onPress,
}: {
  checked?: boolean;
  onPress: () => void;
}) => {
  return (
    <BouncyCheckbox
      isChecked={checked}
      size={24}
      unFillColor="#FFFFFF"
      innerIconStyle={{
        borderWidth: 2,
        borderRadius: 6,
        borderColor: "#D0D5DD",
      }}
      fillColor={Colors.primary}
      iconStyle={{
        borderRadius: 6,
        borderColor: Colors.primary,
        borderWidth: 2,
      }}
      onPress={(isChecked: boolean) => {
        console.log(isChecked);
        onPress();
      }}
    />
  );
};

export default CheckBox;
