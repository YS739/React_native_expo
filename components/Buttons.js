import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Buttons = ({ setCat, category }) => {
  return (
    <View style={styles.buttonBox}>
      <TouchableOpacity
        onPress={() => setCat("js")}
        style={{
          ...styles.button,
          backgroundColor: category === "js" ? "#0FBCF9" : "gray",
        }}
      >
        <Text style={styles.buttonText}>Javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("react")}
        style={{
          ...styles.button,
          backgroundColor: category === "react" ? "#0FBCF9" : "gray",
        }}
      >
        <Text style={styles.buttonText}>React</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("ct")}
        style={{
          ...styles.button,
          backgroundColor: category === "ct" ? "#0FBCF9" : "gray",
        }}
      >
        <Text style={styles.buttonText}>Coding Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  button: {
    width: "30%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "600",
  },
});
