import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/store/themeStore";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import styles from "./page.styles";
const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
          borderColor: isDarkMode ? "#555" : "#ddd",
        },
      ]}
    >
      {isDarkMode ? (
        <Feather name="sun" size={24} color="#FFC107" />
      ) : (
        <Entypo name="moon" size={24} color="#2196F3" />
      )}
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
