import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  fullWidthButton: {
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
export default styles;
