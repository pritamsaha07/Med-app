import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./page.styles";
import { Medication } from "@/constants";
const MedicationTimelineItem: React.FC<{
  medication: Medication;
  status: string;
  color: string;
  onPress: () => void;
  isInteractive: boolean;
  isLast?: boolean;
}> = ({
  medication,
  status,
  color,
  onPress,
  isInteractive,
  isLast = false,
}) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineDotContainer}>
      <View style={[styles.timelineDot, { backgroundColor: color }]} />
      {!isLast && <View style={styles.timelineLine} />}
    </View>
    <TouchableOpacity
      style={styles.medicationCard}
      disabled={!isInteractive}
      onPress={onPress}
    >
      <View style={styles.medicationHeader}>
        <Text style={styles.medicationName}>{medication.name}</Text>
        <Text style={[styles.medicationStatus, { color }]}>
          {status.toUpperCase()}
        </Text>
      </View>
      <View style={styles.medicationDetails}>
        <Text style={styles.medicationDetailsText}>
          {medication.dosage} - {medication.quantity} -{medication.instructions}
        </Text>
        <Text style={styles.medicationTime}>{medication.time}</Text>
      </View>
      {medication.specialNotes && (
        <Text style={styles.specialNotes}>Note: {medication.specialNotes}</Text>
      )}
    </TouchableOpacity>
  </View>
);

export default MedicationTimelineItem;
