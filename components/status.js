import React, { useState } from "react";
import Checked from "./rezervisaniSteStatus";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
let rezervacija = {};
function ProvjeraStatusa({ statusRedniBR, statusIme, setShowChecked }) {
  fetch("https://izbjegniguzvu.000webhostapp.com/css/provjeraRB.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      redni_br: statusRedniBR,
      ime: statusIme,
    }),
  })
    .then((response) => response.text())
    .then((response) => {
      let data = response;
      // console.log(data);
      if (data != "Neispravan unos") {
        const arr = data.split("\n");
        let brojac = 0;
        let ID_rezervacije;
        let redni_broj;
        let vrijeme;
        let datum;
        let ime;
        let usluga;
        let doktor;
        for (let i in arr) {
          brojac++;
          if (brojac === 1) {
            ID_rezervacije = arr[i];
          } else if (brojac === 2) {
            redni_broj = arr[i];
          } else if (brojac === 3) {
            vrijeme = arr[i];
          } else if (brojac === 4) {
            datum = arr[i];
          } else if (brojac === 5) {
            ime = arr[i];
          } else if (brojac === 6) {
            usluga = arr[i];
          } else if (brojac === 7) {
            doktor = arr[i];
            rezervacija = new Rezervacija(
              ID_rezervacije,
              redni_broj,
              vrijeme,
              datum,
              ime,
              usluga,
              doktor
            );
            brojac = 0;
            setShowChecked(true);
          }
        }
      } else {
        Alert.alert("Obavještenje", "Neispravan unos");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
class Rezervacija {
  constructor(ID_rezervacije, redni_broj, vrijeme, datum, ime, usluga, doktor) {
    this.ID_rezervacije = ID_rezervacije;
    this.redni_broj = redni_broj;
    this.vrijeme = vrijeme;
    this.datum = datum;
    this.ime = ime;
    this.usluga = usluga;
    this.doktor = doktor;
  }
}

/* */
const StatusChecker = ({ close }) => {
  const [statusRedniBR, setStatusRedniBR] = useState("");
  const [statusIme, setStatusIme] = useState("");
  const [showChecked, setShowChecked] = useState(false);

  const handleStatusCheck = () => {
    ProvjeraStatusa({ statusRedniBR, statusIme, setShowChecked });
  };

  return (
    <View style={styles.body}>
      {showChecked && (
        <Checked
          close={setShowChecked}
          closeRez={close}
          rezervacija={rezervacija}
        />
      )}
      <View style={styles.popup}>
        <View style={styles.popupHeading}>
          <Text style={styles.popupHeadingh1}>Provjera rezervacije</Text>
          <Text style={styles.popupHeadingX} onPress={() => close(false)}>
            X
          </Text>
        </View>
        <View style={styles.parentview}>
          <Text style={styles.texth4}>Unesite vaš redni broj:</Text>
          <TextInput
            style={styles.textPopup}
            placeholder="435"
            value={statusRedniBR}
            onChangeText={(text) => setStatusRedniBR(text)}
          />
          <Text style={styles.texth4}>Unesite vaše ime:</Text>
          <TextInput
            style={styles.textPopup}
            placeholder="Marko Markovic"
            value={statusIme}
            onChangeText={(text) => setStatusIme(text)}
          />
          <TouchableOpacity
            style={styles.buttonProvjera}
            onPress={handleStatusCheck}
          >
            <Text style={styles.textBtn}>Provjera rezervacije</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 200,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  popup: {
    position: "absolute",
    left: "10%",
    top: "30%",
    backgroundColor: "#c02d2d",
    borderColor: "white",
    borderWidth: 1,
    height: "auto",
    width: "80%",
  },
  popupHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "15%",
    borderColor: "white",
    borderWidth: 2,
  },
  popupHeadingh1: {
    fontSize: 20,
    color: "white",
  },
  popupHeadingX: {
    position: "absolute",
    right: 10,
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  parentview: {
    margin: 20,
  },
  buttonProvjera: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  textBtn: {
    color: "#c02d2d",
    fontWeight: "bold",
  },
  textPopup: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  texth4: {
    marginTop: 10,
    color: "white",
    fontSize: 20,
  },
});

export default StatusChecker;
