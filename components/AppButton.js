import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AppButton = ({ idLokacije, naziv, title, screenName }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  return isVisible ? (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Izaberite uslugu", { title, idLokacije });
      }}
      style={styles.appButtonContainer}
    >
      <Text style={styles.appButtonText}>{naziv}</Text>
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({
  appButtonContainer: {
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "#c02d2d",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    height: "20%",
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AppButton;
