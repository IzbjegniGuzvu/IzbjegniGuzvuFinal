import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Footer from "./footer";
import Header from "./header";
import { PopupRezervisi, dataBase } from "./popupsRezervisi";
import { AddDoktori, AddUsluge, CurDate } from "./database";
import StatusChecker from "./status";
import LoginForm from "./adminLogin";

const slides = {
  pen: require("./images/pen.png"),
  book: require("./images/book.png"),
};
const ContainerBtn = ({ onPress, title, imgs }) => (
  <View style={styles.appButtonContainer}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.appButtonText}>{title}</Text>
      <Image source={slides[imgs]} style={styles.img} />
    </TouchableOpacity>
  </View>
);

const Home = ({ route }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { title, idLokacije } = route.params;
  const splittedTitle = title.split("/")[0].split(":")[1];
  let lok = idLokacije;
  return (
    <View style={styles.body}>
      {showLogin && <LoginForm close={setShowLogin} />}
      {showPopup && (
        <PopupRezervisi
          idLokacije={idLokacije}
          title={title}
          dataBase={dataBase}
          close={setShowPopup}
        />
      )}
      {showStatus && <StatusChecker close={setShowStatus} />}
      <AddDoktori idLokacije={lok} />
      <AddUsluge />
      <CurDate />
      <Header setShowLogin={setShowLogin} showLogin={showLogin} />
      <View style={styles.page}>
        <View style={styles.screenContainer}>
          <ContainerBtn
            imgs="book"
            title="Rezerviši"
            size="sm"
            onPress={() => setShowPopup(!showPopup)}
          />
          <ContainerBtn
            imgs="pen"
            title="Status"
            size="sm"
            onPress={() => setShowStatus(!showStatus)}
          />
        </View>
        <Footer title={splittedTitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#c02d2d",
    height: "87%",
    margin: 0,
  },
  img: {
    position: "absolute",
    right: 0,
    width: 70,
    height: 70,
  },
  screenContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: 0,
  },
  appButtonContainer: {
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "#c02d2d",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    height: "40%",
  },
  appButtonText: {
    fontSize: 25,
    backgroundColor: "white",
    color: "#c02d2d",
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 1,
    width: "70%",
    padding: 20,
  },
});
export default Home;
