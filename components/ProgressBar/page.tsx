import React from "react";
import { View, Text } from "react-native";
import styles from "./page.styles";
const CircularProgress: React.FC<{ taken: number; total: number }> = ({
  taken,
  total,
}) => {
  const percentage = (taken / total) * 100;
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <View
          style={[
            styles.progress,
            {
              transform: [{ rotate: "-90deg" }],
              borderColor:
                percentage >= 90
                  ? "#4CAF50"
                  : percentage >= 70
                  ? "#2196F3"
                  : percentage >= 50
                  ? "#FFC107"
                  : "#F44336",
            },
          ]}
        />
        <Text style={styles.text}>{`${Math.round(percentage)}%`}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Taken: {taken}</Text>
        <Text style={styles.infoText}>Remaining: {total - taken}</Text>
        <Text style={styles.infoText}>Total: {total}</Text>
      </View>
    </View>
  );
};

export default CircularProgress;
