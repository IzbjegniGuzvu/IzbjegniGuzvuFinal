import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Image source={require("./images/logo.png")} style={styles.img} />
      <Text style={styles.headerH1}>Izbjegni gužvu</Text>
      <TouchableOpacity
        style={styles.burger}
        onPress={() => {
          navigation.navigate("Izaberite lokaciju");
        }}
      >
        <Text style={styles.bar}></Text>
        <Image source={require("./images/back.png")} style={styles.imgBack} />
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
  imgBack: {
    position: "absolute",
    right: 30,
    width: 30,
    height: 30,
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
    top: "75%",
    right: 0,
    width: 30,
    height: 30,
  },
  bar: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 40,
    height: 5,
    backgroundColor: "white",
    textAlign: "center",
    margin: 4,
  },
});
export default Header;
