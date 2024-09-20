import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "@/constants/Colors";
import { MainIcon } from "@/assets/icons/tabIcons";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/button";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import CheckBox from "@/components/ui/checkBox";
import ShipmentItem, { IShipment } from "@/components/shipmentItem";
import { useGetShipments } from "@/api/hooks/shippex.hooks";
import { RefreshControl } from "react-native-gesture-handler";
import { BottomSheet, BottomSheetRef } from "@/components/ui/BottomSheet";
import { cn } from "@/lib/utils";
import Animated, { FadeIn } from "react-native-reanimated";

export const handleSearch = (options: IShipment[], searchQuery: string) => {
  const searchData = options?.filter((option) => {
    return (
      option.number?.toString().includes(searchQuery.toLowerCase()) ||
      option?.from?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option?.to?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return searchQuery ? searchData : options;
};
const Shipments = () => {
  const { shipments, shipmentsLoading, refetchShipments } = useGetShipments();
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [selectedShipments, setSelectedShipments] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [showBackdrop, setShowBackdrop] = useState(false);
  const statusOptions = [
    "Received",
    "Putaway",
    "Delivered",
    "Canceled",
    "Rejected",
    "Lost",
    "On Hold",
    "Error",
  ];

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Handle status selection
  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status === selectedStatus ? null : status);
  };
  const bottomSheetModalRef = useRef<BottomSheetRef>(null);

  // variables
  const snapPoints = useMemo(() => ["50%", "40%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    setShowBackdrop(true);
    bottomSheetModalRef.current?.present();
  }, []);
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const shipmentsData: IShipment[] = [
    {
      code: "AWB",
      from: "Cairo",
      to: "Alexandria",
      number: 41785691423,
      status: "canceled",
    },
    {
      code: "CCA",
      from: "Abuja",
      to: "Cape-town",
      number: 56425674321,
      status: "received",
    },
    {
      code: "CCA",
      from: "Abuja",
      to: "Cape-town",
      number: 56425674321,
      status: "delivered",
    },
    {
      code: "LAK",
      from: "Lagos",
      to: "Kano",
      number: 91485691423,
      status: "error",
    },
    {
      code: "GHA",
      from: "Accra",
      to: "Cape-town",
      number: 212125674321,
      status: "on hold",
    },
  ];

  const toggleSelectAll = () => {
    if (isSelectAll) {
      setSelectedShipments([]);
    } else {
      setSelectedShipments(shipmentsData.map((shipment) => shipment.number));
    }
    setIsSelectAll(!isSelectAll);
  };

  const toggleSelection = (number: number) => {
    if (selectedShipments.includes(number)) {
      setSelectedShipments(selectedShipments.filter((id) => id !== number));
    } else {
      setSelectedShipments([...selectedShipments, number]);
    }
  };

  const searchData = handleSearch(shipmentsData, searchValue);

  const filteredShipments = useMemo(() => {
    if (selectedStatus) {
      return searchData.filter(
        (shipment) =>
          shipment.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }
    return shipmentsData; // Return all shipments if no status is selected
  }, [selectedStatus]);
  return (
    <>
      <SafeAreaView className="bg-white flex-1">
        <Animated.View entering={FadeIn} className="px-5 flex-1">
          <View className="flex mt-3  flex-row justify-between items-center">
            <Image
              className="w-12 h-12 rounded-full "
              source={require("@/assets/images/person.png")}
            />
            <MainIcon />
            <TouchableOpacity className="bg-gray rounded-full h-10 w-10 flex items-center justify-center px">
              <Feather name="bell" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View className="my-6 flex-1">
            <FlatList
              ListHeaderComponent={
                <>
                  <View>
                    <Text className="text-base text-muted">Hello,</Text>
                    <Text className="text-[28px] mb-4 text-black font-bold mt-1">
                      Ibrahim Shaker
                    </Text>
                    <Input
                      onChangeText={(value) => {
                        setSearchValue(value);
                      }}
                      search
                      placeHolder="Search"
                    />
                  </View>
                  <View className="flex-row w-full gap-3 mt-3">
                    <Button
                      onPress={handlePresentModalPress}
                      className="w-[47%] bg-gray"
                      _labelClassName="text-muted"
                      iconLeft={
                        <MaterialCommunityIcons
                          name="filter-variant"
                          size={24}
                          color={Colors.muted}
                        />
                      }
                    >
                      Filters
                    </Button>
                    <Button
                      className="w-[47%]"
                      iconLeft={
                        <MaterialCommunityIcons
                          name="line-scan"
                          size={24}
                          color="white"
                        />
                      }
                    >
                      Add Scan
                    </Button>
                  </View>
                  <View className="mt-6 mb-4 flex-row justify-between ">
                    <Text className="text-[22px] font-bold">Shipments</Text>

                    <TouchableOpacity
                      onPress={toggleSelectAll}
                      className="flex-row"
                    >
                      <CheckBox
                        onPress={toggleSelectAll}
                        checked={isSelectAll}
                      />
                      <Text className="text-lg text-primary">Mark All</Text>
                    </TouchableOpacity>
                  </View>
                </>
              }
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={shipmentsLoading}
                  onRefresh={refetchShipments}
                />
              }
              className="mt-6"
              data={filteredShipments}
              renderItem={({ item }) => (
                <ShipmentItem
                  toggleSelection={toggleSelection}
                  selected={selectedShipments.includes(item.number)}
                  {...item}
                />
              )}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
      <BottomSheet
        onDismiss={() => {
          setShowBackdrop(false);
        }}
        showBackdrop={showBackdrop}
        ref={bottomSheetModalRef}
        onPressBackdrop={handleCloseModalPress}
        index={1}
        snapPoints={snapPoints}
      >
        <View className="flex-row border-b border-line justify-between">
          <Pressable
            onPress={handleCloseModalPress}
            className="py-2 flex-row px-3 mb-2"
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Colors.primary}
            />
            <Text className="text-lg text-primary ">Cancel</Text>
          </Pressable>

          <Text className="font-bold text-xl mr-7">Filters</Text>

          <Pressable
            onPress={handleCloseModalPress}
            className="py-2 flex-row px-3 mb-2"
          >
            <Text className="text-lg text-primary">Done</Text>
          </Pressable>
        </View>
        <View className="bg-white flex-1 px-3 py-4 h-full">
          <Text className=" text-base mb-4 text-[#58536E]">
            SHIPMENT STATUS
          </Text>
          <View className="flex flex-wrap  flex-row gap-2">
            {statusOptions.map((status) => (
              <Pressable
                key={status}
                onPress={() => handleStatusSelect(status)}
                className={cn(
                  "px-4 py-2 rounded-lg border border-[#e0e0e0]", // Base styling
                  {
                    "bg-gray text-[#000]": selectedStatus !== status, // Default style
                    " text-primary-200 border-primary bg-primary-200":
                      selectedStatus === status, // Selected style
                  }
                )}
              >
                <Text
                  className={cn("text-sm font-medium", {
                    "text-[#0056F6]": selectedStatus === status, // Text color when selected
                    "text-[#7C7C7C]": selectedStatus !== status, // Default text color
                  })}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default Shipments;
