import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ color }) => (
            <Ionicons name="today" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="calender"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => (
            <AntDesign name="calendar" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="healthData"
        options={{
          title: "Health Data",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="health-and-safety" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
