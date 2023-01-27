import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Rezervacija from "./clasaRezervacije";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Checked from "./rezervisaniSte";
let rezervacija = {};
const BtnRezervisi = ({
  selectedValueLjekari,
  selectedValueDatum,
  selectedValueVreme,
  selectedValueUsluge,
  idLokacije,
  number,
  title,
  showIzaberiVreme,
  setshowIzaberiVreme,
  showChecked,
  setShowChecked,
  closeRez,
}) => {
  return (
    <TouchableOpacity
      style={styles.BtnRezervisiContainer}
      onPress={() => {
        if (
          selectedValueVreme === "" ||
          selectedValueVreme === "Izaberite vrijeme"
        ) {
          Alert.alert("Obavještenje", "Niste izabrali vrijeme");
        } else {
          fetch("https://izbjegniguzvu.000webhostapp.com/css/addRez.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
              doktor: selectedValueLjekari,
              datum: selectedValueDatum,
              vrijeme: selectedValueVreme,
              ID_lokacije: idLokacije,
              usluga: selectedValueUsluge,
              ime: number,
            }),
          })
            .then((response) => response.text())
            .then((response) => {
              let data = response;
              const arr = data.split("\n");
              Alert.alert("Obavještenje", "Uspješna rezervacija");
              let brojac = 0;
              let ID_rezervacije;
              let redni_broj;
              let vrijeme;
              let datum;
              let skracenica1;
              let ime;
              let usluga;
              let doktor;
              for (let i = 1; i < arr.length; i++) {
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
                  skracenica1 = arr[i];
                } else if (brojac === 6) {
                  ime = arr[i];
                } else if (brojac === 7) {
                  usluga = arr[i];
                } else if (brojac === 8) {
                  doktor = arr[i];
                  rezervacija = new Rezervacija(
                    ID_rezervacije,
                    redni_broj,
                    vrijeme,
                    datum,
                    skracenica1,
                    ime,
                    usluga,
                    doktor
                  );
                  brojac = 0;
                }
              }
              console.log(rezervacija);
              setShowChecked(true);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }}
    >
      <Text style={styles.BtnRezervisiText}>Rezerviši se</Text>
    </TouchableOpacity>
  );
};
const PadajuciMeniVreme = ({
  podaci,
  naziv,
  dataBase,
  selectedValueVreme,
  onSelect,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);
  return isVisible ? (
    <View>
      <Text style={styles.selectText}>{naziv}</Text>
      <SelectDropdown
        data={dataBase[podaci]}
        defaultValueByIndex={0}
        onSelect={onSelect}
        selectedValueVreme={selectedValueVreme}
        buttonStyle={styles.btnSelect}
        buttonTextStyle={styles.btnSelectText}
      />
    </View>
  ) : null;
};

const PopupVreme = ({
  selectedValueLjekari,
  selectedValueDatum,
  selectedValueUsluge,
  idLokacije,
  dataBase,
  number,
  close,
  title,
  showIzaberiVreme,
  setshowIzaberiVreme,
  closeRez,
}) => {
  const [selectedValueVreme, setSelectedValueVreme] = React.useState("");
  const [showChecked, setShowChecked] = useState(false);
  return (
    <View style={styles.body}>
      {showChecked && (
        <Checked
          close={setShowChecked}
          closeRez={closeRez}
          rezervacija={rezervacija}
        />
      )}
      <View style={styles.popupRezervisi}>
        <View style={styles.popupHeading}>
          <Text style={styles.popupHeadingh1}>Izaberite vreme</Text>
          <Text style={styles.popupHeadingX} onPress={() => close(false)}>
            X
          </Text>
        </View>
        <PadajuciMeniVreme
          podaci="vrijeme"
          naziv="Vrijeme"
          dataBase={dataBase}
          selectedValueVreme={selectedValueVreme}
          onSelect={(item) => {
            setSelectedValueVreme(item);
          }}
        />
        <BtnRezervisi
          selectedValueDatum={selectedValueDatum}
          selectedValueUsluge={selectedValueUsluge}
          selectedValueLjekari={selectedValueLjekari}
          selectedValueVreme={selectedValueVreme}
          number={number}
          idLokacije={idLokacije}
          title={title}
          showIzaberiVreme={showIzaberiVreme}
          close={setshowIzaberiVreme}
          setshowIzaberiVreme={setshowIzaberiVreme}
          setShowChecked={setShowChecked}
          showChecked={showChecked}
          closeRez={closeRez}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "100%",
    width: "100%",
  },
  popupRezervisi: {
    position: "absolute",
    top: "5%",
    left: "5%",
    backgroundColor: "#c02d2d",
    height: "40%",
    width: "90%",
    zIndex: 400,
    borderColor: "white",
    borderWidth: 2,
  },
  popupHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "10%",
    borderColor: "white",
    borderWidth: 2,
  },
  popupHeadingh1: {
    fontSize: 20,
    color: "white",
  },
  popupHeadingX: {
    position: "absolute",
    right: 25,
    fontSize: 20,
    color: "white",
    padding: 10,
  },
  btnSelect: {
    width: "80%",
    alignSelf: "center",
    height: "25%",

    color: "white",
    backgroundColor: "white",
  },
  selectText: {
    fontSize: 20,
    marginTop: "20%",
    marginBottom: "10%",
    marginLeft: "10%",
    color: "white",
  },
  btnSelectText: {
    fontSize: 20,
    marginLeft: "10%",
    color: "c02d2d",
  },
  BtnRezervisiContainer: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#c02d2d",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: "80%",
    height: "15%",
  },
  BtnRezervisiText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PopupVreme;
