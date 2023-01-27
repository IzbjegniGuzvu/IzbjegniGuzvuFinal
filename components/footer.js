import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NazadButton = ({ title }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Izaberite lokaciju")}
      style={styles.appButtonContainer}
    >
      <Text style={styles.footerNazad}>{title}</Text>
    </TouchableOpacity>
  );
};

const Footer = ({ title }) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerLokacija}>{title}</Text>
      <NazadButton style={styles.footerNazad} title="Nazad" size="sm" />
    </View>
  );
};
const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    backgroundColor: "#c02d2d",
    height: "20%",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
  },
  footerLokacija: {
    textAlignVertical: "center",
    height: "100%",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    width: "80%",
  },
  footerNazad: {
    display: "flex",
    padding: 15,
    borderLeftColor: "white",
    borderLeftWidth: 3,
    color: "white",
    textAlignVertical: "center",
    textAlign: "center",
    height: "100%",
    width: "100%",
  },
});
export default Footer;
