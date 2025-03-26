import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 10,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progress: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 10,
    borderColor: "#2196F3",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
  },
});
export default styles;
