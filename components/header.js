import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
const Header = ({ showLogin, setShowLogin }) => {
  return (
    <View style={styles.header}>
      <Image source={require("./images/logo.png")} style={styles.img} />
      <Text style={styles.headerH1}>Izbjegni gužvu</Text>
      <TouchableOpacity
        style={styles.burger}
        onPress={() => {
          setShowLogin(!showLogin);
        }}
      >
        <Text style={styles.bar}></Text>
        <Text style={styles.bar}></Text>
        <Text style={styles.bar}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
  img: {
    marginLeft: 10,
    width: 50,
    height: 50,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
    height: "13%",
    width: "100%",
    backgroundColor: "#c02d2d",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
  headerH1: {
    width: "50%",
    flexGrow: 1,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  burger: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: 30,
    height: 20,
    right: 40,
    top: "65%",
  },
  bar: {
    width: 50,
    height: 5,
    flexGrow: 1,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "white",
    textAlign: "center",
    margin: 4,
  },
});
export default Header;
