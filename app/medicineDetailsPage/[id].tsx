import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import FullWidthButton from "@/components/FullWidthButton/page";
import { useMedicationStore } from "@/store/medicineStore";
import { useThemeStore } from "@/store/themeStore";

const MedicinePage = () => {
  const { id } = useLocalSearchParams();
  const { isDarkMode } = useThemeStore();
  const styles = createStyles(isDarkMode);
  const { medications, markMedicationAsTaken } = useMedicationStore();

  const medication = medications.find((med) => med.id === id);
  const [isTaken, setIsTaken] = useState(medication?.status === "taken");

  if (!medication) {
    return <Text style={styles.detailText}>Medication not found</Text>;
  }

  const handleMarkAsTaken = () => {
    markMedicationAsTaken(medication.id);
    setIsTaken(true);
  };

  return (
    <Animated.ScrollView
      entering={FadeIn.delay(200)}
      exiting={FadeOut}
      style={styles.container}
    >
      <Animated.View
        entering={SlideInRight.delay(100)}
        style={styles.medicineNameCard}
      >
        <Text style={styles.medicineNameText}>{medication.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Dosage: {medication.dosage}</Text>
          <Text style={styles.detailText}>Quantity: {medication.quantity}</Text>
        </View>
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(200)} style={styles.card}>
        <Text style={styles.cardTitle}>Schedule</Text>

        <Text style={styles.detailText}>Time: {medication.time}</Text>
        <Text style={styles.detailText}>Frequency: Daily</Text>
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(300)} style={styles.card}>
        <Text style={styles.cardTitle}>Instructions</Text>

        {medication.instructions ? (
          <Text style={styles.detailText}>
            How to take: {medication.instructions}
          </Text>
        ) : (
          <Text style={styles.detailText}>No special instructions</Text>
        )}
        {medication.specialNotes ? (
          <Text style={styles.specialText}>
            Special Notes: {medication.specialNotes}
          </Text>
        ) : (
          <Text style={styles.detailText}>No special notes</Text>
        )}
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(400)} style={styles.card}>
        <Text style={styles.cardTitle}>Inventory</Text>

        <Text style={styles.detailText}>
          Remaining: {medication.inventory || "Not tracked"}
        </Text>
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(500)}>
        <FullWidthButton
          title="Mark as Taken"
          disabledTitle="Taken ✓"
          backgroundColor="#4CAF50"
          disabledBackgroundColor="#e0e0e0"
          disabledTextColor="#888"
          onPress={handleMarkAsTaken}
          disabled={isTaken}
        />
        <FullWidthButton title="Edit Medication" backgroundColor="#2196F3" />
      </Animated.View>
    </Animated.ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#121212" : "#F5F5F5",
      padding: 15,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "bold",
    },
    medicineNameCard: {
      backgroundColor: isDarkMode ? "#1E1E1E" : "white",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    medicineNameText: {
      fontSize: 22,
      fontWeight: "bold",
      color: isDarkMode ? "#FFFFFF" : "#000000",
      marginBottom: 10,
    },
    detailsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    detailText: {
      color: isDarkMode ? "#B0B0B0" : "#666666",
      fontSize: 16,
    },
    card: {
      backgroundColor: isDarkMode ? "#1E1E1E" : "white",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDarkMode ? "#FFFFFF" : "#000000",
      marginBottom: 10,
    },

    specialText: {
      color: isDarkMode ? "#FFC107" : "#FF5722",
      fontSize: 16,
      marginTop: 5,
    },
  });

export default MedicinePage;
