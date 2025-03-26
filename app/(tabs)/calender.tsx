import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import { useThemeStore } from "@/store/themeStore";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import { useMedicationStore } from "@/store/medicineStore";

const CalendarComponent = () => {
  const { isDarkMode } = useThemeStore();
  const themedStyles = isDarkMode ? darkStyles : lightStyles;
  const { weeklyAdherence, medications, todayProgress, markMedicationAsTaken } =
    useMedicationStore();
  const getAdherenceColor = (rate: any) => {
    if (rate >= 90) return "#2ecc71";
    if (rate >= 50) return "#f39c12";
    return "#e74c3c";
  };

  return (
    <Animated.ScrollView
      entering={FadeIn.delay(200)}
      exiting={FadeOut}
      style={[
        styles.container,
        { backgroundColor: themedStyles.backgroundColor },
      ]}
    >
      <Animated.View
        entering={SlideInRight.delay(100)}
        style={styles.headerContainer}
      >
        <Text style={[styles.header, { color: themedStyles.textColor }]}>
          March 10 - March 17
        </Text>
      </Animated.View>

      <Animated.View
        entering={SlideInRight.delay(200)}
        style={[
          styles.card,
          {
            backgroundColor: themedStyles.cardBackground,
            shadowColor: themedStyles.shadowColor,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themedStyles.textColor }]}>
          Weekly Adherence by Day
        </Text>
        <View style={styles.chartContainer}>
          {weeklyAdherence.daily.map((day, index) => (
            <View key={day.day} style={styles.chartColumn}>
              <View
                style={[
                  styles.chartBar,
                  {
                    height: day.rate,
                    backgroundColor: getAdherenceColor(day.rate),
                  },
                ]}
              />
              <Text
                style={[
                  styles.chartDayLabel,
                  { color: themedStyles.secondaryTextColor },
                ]}
              >
                {day.day}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>
      <Animated.View
        entering={SlideInRight.delay(300)}
        style={[
          styles.card,
          {
            backgroundColor: themedStyles.cardBackground,
            shadowColor: themedStyles.shadowColor,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themedStyles.textColor }]}>
          Today's Progress
        </Text>
        <View style={styles.adherenceSummary}>
          <View>
            <Text style={{ color: themedStyles.secondaryTextColor }}>
              Adherence Rate
            </Text>
            <Text
              style={[
                styles.adherenceRate,
                {
                  color: getAdherenceColor(todayProgress.adherenceRate),
                },
              ]}
            >
              {todayProgress.adherenceRate}%
            </Text>
          </View>
          <View>
            <Text style={{ color: themedStyles.secondaryTextColor }}>
              Doses Taken
            </Text>
            <Text
              style={[styles.dosesTaken, { color: themedStyles.textColor }]}
            >
              {todayProgress.takenToday} / {todayProgress.totalForToday}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Animated.View
        entering={SlideInRight.delay(300)}
        style={[
          styles.card,
          {
            backgroundColor: themedStyles.cardBackground,
            shadowColor: themedStyles.shadowColor,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themedStyles.textColor }]}>
          Overall Adherence
        </Text>
        <View style={styles.adherenceSummary}>
          <View>
            <Text style={{ color: themedStyles.secondaryTextColor }}>
              Weekly Adherence Rate
            </Text>
            <Text
              style={[
                styles.adherenceRate,
                {
                  color: getAdherenceColor(weeklyAdherence.overall),
                },
              ]}
            >
              {weeklyAdherence.overall}%
            </Text>
          </View>
          <View>
            <Text style={{ color: themedStyles.secondaryTextColor }}>
              Doses Taken
            </Text>
            <Text
              style={[styles.dosesTaken, { color: themedStyles.textColor }]}
            >
              {weeklyAdherence.dosesTaken} / {weeklyAdherence.totalDoses}
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        entering={SlideInRight.delay(400)}
        style={[
          styles.card,
          {
            backgroundColor: themedStyles.cardBackground,
            shadowColor: themedStyles.shadowColor,
          },
        ]}
      >
        <Text style={[styles.cardTitle, { color: themedStyles.textColor }]}>
          Medication Details
        </Text>
        {medications.map((med) => (
          <View
            key={med.id}
            style={[
              styles.medicationItem,
              { borderBottomColor: themedStyles.borderColor },
            ]}
          >
            <View>
              <Text
                style={[
                  styles.medicationName,
                  { color: themedStyles.textColor },
                ]}
              >
                {med.name}
              </Text>
              <Text style={{ color: themedStyles.secondaryTextColor }}>
                {med.dosage} - {med.instructions}
              </Text>
            </View>
            <View style={styles.medicationDetails}>
              <View style={styles.adherenceContainer}>
                <View
                  style={[
                    styles.adherenceBadge,
                    {
                      backgroundColor: getAdherenceColor(med.adherence.weekly),
                    },
                  ]}
                >
                  <Text style={styles.adherenceBadgeText}>
                    {med.adherence.weekly}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </Animated.View>
    </Animated.ScrollView>
  );
};

const lightStyles = {
  backgroundColor: "#f4f4f4",
  textColor: "#333",
  secondaryTextColor: "#666",
  cardBackground: "white",
  shadowColor: "rgba(0,0,0,0.1)",
  borderColor: "#eee",
};

const darkStyles = {
  backgroundColor: "#121212",
  textColor: "#FFFFFF",
  secondaryTextColor: "#B0B0B0",
  cardBackground: "#1E1E1E",
  shadowColor: "rgba(255,255,255,0.1)",
  borderColor: "#333",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 230,
    alignItems: "flex-end",
  },
  chartColumn: {
    alignItems: "center",
  },
  chartBar: {
    width: 40,
    borderRadius: 5,
  },
  chartDayLabel: {
    marginTop: 5,
    fontSize: 12,
  },
  adherenceSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  adherenceRate: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dosesTaken: {
    fontSize: 24,
    fontWeight: "bold",
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  medicationDetails: {
    alignItems: "flex-end",
  },
  adherenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  adherenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  adherenceBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CalendarComponent;
