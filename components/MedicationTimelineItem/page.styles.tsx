import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  timelineItem: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 15,
  },
  timelineDotContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 5,
    marginBottom: 5,
  },

  medicationCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  medicationStatus: {
    fontSize: 14,
    fontWeight: "600",
  },
  medicationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  medicationDetailsText: {
    flex: 1,
    marginRight: 10,
  },
  medicationTime: {
    color: "#666",
  },
  specialNotes: {
    fontSize: 12,
    color: "#F44336",
    marginTop: 5,
  },
});
export default styles;
