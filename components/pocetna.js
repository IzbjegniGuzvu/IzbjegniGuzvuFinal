import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import AppButton from "./AppButton";
import Header from "./header";
import LoginForm from "./adminLogin";
const Pocetna = () => {
  const [buttons, setButtons] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <View style={styles.body}>
      {showLogin && <LoginForm close={setShowLogin} />}
      <Header setShowLogin={setShowLogin} showLogin={showLogin} />
      <View style={styles.page}>
        <View style={styles.screenContainer}>
          <AddLocations setButtons={setButtons} />
          {buttons.map((location) => (
            <AppButton
              key={location.ID_lokacije}
              idLokacije={location.ID_lokacije}
              naziv={`${location.skracenica}: ${location.mjesto} ${location.adresa} /${location.radno_vrijeme}`}
              title={`${location.skracenica}: ${location.mjesto} ${location.adresa} /${location.radno_vrijeme}`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const AddLocations = ({ setButtons }) => {
  useEffect(() => {
    fetch("https://izbjegniguzvu.000webhostapp.com/lokacije.php", {})
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        let data = response;
        var lines = data.split("\n");
        let ID_lokacije, mjesto, skracenica, adresa, radno_vrijeme, kontakt;
        let brojac = 0;
        let lokacija_niz = [];
        for (let i = 0; i < lines.length; i++) {
          brojac++;
          if (brojac === 1) {
            ID_lokacije = lines[i];
          } else if (brojac === 2) {
            mjesto = lines[i];
          } else if (brojac === 3) {
            skracenica = lines[i];
          } else if (brojac === 4) {
            adresa = lines[i];
          } else if (brojac === 5) {
            kontakt = lines[i];
          } else if (brojac === 6) {
            radno_vrijeme = lines[i];
            let lokacija = new Lokacija(
              ID_lokacije,
              mjesto,
              skracenica,
              adresa,
              kontakt,
              radno_vrijeme
            );
            brojac = 0;
            lokacija_niz.push(lokacija);
          }
        }
        setButtons(lokacija_niz);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
};

class Lokacija {
  constructor(ID_lokacije, mjesto, skracenica, adresa, kontakt, radno_vrijeme) {
    this.ID_lokacije = ID_lokacije;
    this.mjesto = mjesto;
    this.skracenica = skracenica;
    this.adresa = adresa;
    this.kontakt = kontakt;
    this.radno_vrijeme = radno_vrijeme;
  }
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
  page: {
    backgroundColor: "#c02d2d",
    height: "87%",
  },
  screenContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default Pocetna;
