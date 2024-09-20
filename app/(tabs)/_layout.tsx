import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { ProfileIcon, ScanIcon, ShipmentsIcon, WalletIcon } from "@/assets/icons/tabIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabIconDefault,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shipments",
          tabBarIcon: ({ color, focused }) => (
            <ShipmentsIcon color={focused ? color : Colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <ScanIcon color={focused ? color : Colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, focused }) => (
            <WalletIcon
              color={focused ? color : Colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon
              color={focused ? color : Colors.tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
