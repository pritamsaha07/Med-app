import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import medicationsData from "@/constants/Sample_Data_FE.json";
import { useThemeStore } from "@/store/themeStore";
import ThemeToggleButton from "@/components/ToggleThemeButton/page";

const HealthDataComponent = () => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text>Health Data Component</Text>
    </View>
  );
};

export default HealthDataComponent;
