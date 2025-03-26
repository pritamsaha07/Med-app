import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./page.styles";
interface FullWidthButtonProps {
  onPress?: () => void;
  title: string;
  disabledTitle?: string;
  backgroundColor?: string;
  textColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  disabled?: boolean;
}

const FullWidthButton: React.FC<FullWidthButtonProps> = ({
  onPress,
  title,
  disabledTitle,
  backgroundColor = "#2196F3",
  textColor = "white",
  disabledBackgroundColor = "#e0e0e0",
  disabledTextColor = "#888",
  disabled = false,
}) => {
  const displayTitle = disabled && disabledTitle ? disabledTitle : title;

  return (
    <TouchableOpacity
      style={[
        styles.fullWidthButton,
        {
          backgroundColor: disabled ? disabledBackgroundColor : backgroundColor,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: disabled ? disabledTextColor : textColor,
          },
        ]}
      >
        {displayTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default FullWidthButton;
