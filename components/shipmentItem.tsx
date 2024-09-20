import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CheckBox from "./ui/checkBox";
import { ShipmentBox } from "@/assets/icons/icons";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
export interface IShipment {
  status: "received" | "canceled" | "lost" | "delivered" | "error" | "on hold";
  code: string;
  number: number;
  from: string;
  to: string;
  selected?: boolean;
  toggleSelection?: (number: number) => void;
}
function ShipmentItem({
  status = "canceled",
  code,
  from,
  number,
  to,
  toggleSelection,
  selected,
}: IShipment) {
  return (
    <View className="flex-row mb-3 w-full justify-between px-3 py-4 bg-gray rounded-xl">
      <View className="flex-row">
        <TouchableOpacity
        className="mt-4"
          onPress={() => {
            if (toggleSelection) toggleSelection(number);
          }}
        >
          <CheckBox
            onPress={() => {
              if (toggleSelection) toggleSelection(number);
            }}
            checked={selected}
          />
        </TouchableOpacity>
        <View className="mt-2 mr-2">
          <ShipmentBox />
        </View>
      </View>
      <View className="">
        <Text className="text-[13px] text-[#3F395C]">{code}</Text>
        <Text className="font-bold text-lg">{number}</Text>
        <View className="flex-row items-center" style={{ gap: 4 }}>
          <Text className="text-[13px]  text-gray-200">{from}</Text>
          <Feather name="arrow-right" size={15} color={Colors.primary} />
          <Text className="text-[13px]  text-gray-200">{to}</Text>
        </View>
      </View>
      <View className="flex-row items-center" style={{ gap: 6 }}>
        <View
          className={` p-1 w-[74px] rounded border border-white ${
            status === "received"
              ? "bg-primary-200"
              : status === "delivered"
              ? "bg-[#e3fad6] text-[#208D28]"
              : status === "on hold"
              ? "bg-[#fff3d5] text-[#DB7E21]"
              : status === "error"
              ? "bg-[#fee3d4] text-[#D12030]"
              : "bg-gray"
          }`}
        >
          <Text
            className={`
                ${
                  status === "received"
                    ? "text-primary"
                    : status === "delivered"
                    ? " text-[#208D28]"
                    : status === "on hold"
                    ? " text-[#DB7E21]"
                    : status === "error"
                    ? " text-[#D12030]"
                    : "text-[#58536E]"
                } text-center  font-medium uppercase`}
          >
            {status}
          </Text>
        </View>
        <View className="bg-white rounded-full h-7 w-7 items-center justify-center">
          <FontAwesome name="expand" size={18} color={Colors.primary} />
        </View>
      </View>
    </View>
  );
}

export default ShipmentItem;
