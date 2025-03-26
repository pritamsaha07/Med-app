import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
} from "react-native-reanimated";
import ProgressBar from "@/components/ProgressBar/page";
import MedicationTimelineItem from "@/components/MedicationTimelineItem/page";
import FullWidthButton from "@/components/FullWidthButton/page";
import { useMedicationStore } from "@/store/medicineStore";
import { useThemeStore } from "@/store/themeStore";
import ThemeToggleButton from "@/components/ToggleThemeButton/page";

const TodayMedicationPage: React.FC = () => {
  const router = useRouter();
  const currentTime = new Date();

  const { isDarkMode } = useThemeStore();
  const { medications } = useMedicationStore();
  const themedStyles = isDarkMode ? darkStyles : lightStyles;

  const calculateProgress = () => {
    const takenMeds = medications.filter((med) => med.status === "taken");
    const totalMeds = medications.length;

    return {
      taken: takenMeds.length,
      total: totalMeds,
      percentage: (takenMeds.length / totalMeds) * 100,
    };
  };
  const parseTime = (timeString: string): Date => {
    const now = new Date();
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let adjustedHours = hours;
    if (period === "PM" && hours !== 12) {
      adjustedHours += 12;
    }
    if (period === "AM" && hours === 12) {
      adjustedHours = 0;
    }

    now.setHours(adjustedHours, minutes, 0, 0);
    return now;
  };

  const findNextMedication = () => {
    const upcomingMeds = medications
      .filter((med) => med.status !== "taken")
      .sort((a, b) => {
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        return timeA.getTime() - timeB.getTime();
      });

    return upcomingMeds.length > 0 ? upcomingMeds[0] : null;
  };

  const getMedicationStatus = (medication: any) => {
    const medTime = parseTime(medication.time);

    if (medication.status === "taken")
      return {
        status: "taken",
        color: "#4CAF50",
        isInteractive: false,
      };
    if (medTime > currentTime)
      return {
        status: "upcoming",
        color: "#2196F3",
        isInteractive: true,
      };
    return {
      status: "missed",
      color: "#F44336",
      isInteractive: true,
    };
  };

  const handleMedicationPress = (medication: any) => {
    router.push(`../medicineDetailsPage/${medication.id}`);
  };

  const progress = calculateProgress();
  const nextMedication = findNextMedication();

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
        exiting={SlideOutLeft}
        style={styles.headerContainer}
      >
        <Text style={[styles.sectionTitle, { color: themedStyles.textColor }]}>
          Today's Progress
        </Text>
        <ThemeToggleButton />
      </Animated.View>

      <Animated.View
        entering={SlideInRight.delay(200)}
        style={[
          styles.progressCard,
          {
            backgroundColor: themedStyles.cardBackground,
            shadowColor: themedStyles.shadowColor,
          },
        ]}
      >
        <ProgressBar taken={progress.taken} total={progress.total} />

        <View style={styles.nextMedicationContainer}>
          <Text
            style={[
              styles.nextMedicationTitle,
              { color: themedStyles.textColor },
            ]}
          >
            {progress.taken} out of {progress.total} is taken
          </Text>
          {nextMedication && (
            <View style={styles.nextMedicationDetails}>
              <Text style={[styles.text, { color: themedStyles.textColor }]}>
                Next: {nextMedication.name} at{" "}
                <Text style={styles.nextMedicationTime}>
                  {nextMedication.time}
                </Text>
              </Text>
            </View>
          )}
        </View>
      </Animated.View>

      <Text style={[styles.sectionTitle, { color: themedStyles.textColor }]}>
        Timeline
      </Text>

      <Animated.View
        entering={SlideInRight.delay(300)}
        style={styles.timelineContainer}
      >
        {medications.map((medication, index) => {
          const { status, color, isInteractive } =
            getMedicationStatus(medication);

          return (
            <MedicationTimelineItem
              key={medication.id}
              medication={medication}
              status={status}
              color={color}
              onPress={() => handleMedicationPress(medication)}
              isInteractive={isInteractive}
              isLast={index === medications.length - 1}
            />
          );
        })}
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(400)}>
        <FullWidthButton
          title="View Weekly Summary"
          backgroundColor="#2196F3"
        />
      </Animated.View>
    </Animated.ScrollView>
  );
};

const lightStyles = {
  backgroundColor: "#F5F5F5",
  textColor: "#000000",
  cardBackground: "white",
  shadowColor: "rgba(0,0,0,0.1)",
};

const darkStyles = {
  backgroundColor: "#121212",
  textColor: "#FFFFFF",
  cardBackground: "#1E1E1E",
  shadowColor: "rgba(255,255,255,0.1)",
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
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  progressCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  nextMedicationContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nextMedicationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nextMedicationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextMedicationTime: {
    fontSize: 16,
    color: "#2196F3",
  },
  timelineContainer: {
    marginTop: 10,
  },
});

export default TodayMedicationPage;
