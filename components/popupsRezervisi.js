import React, { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import PopupVreme from "./izaberiVreme";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
const dataBase = {
  ljekari: [],
  usluge: [],
  datum: [],
  vrijeme: [],
};

const BtnRezervisi = ({
  selectedValueLjekari,
  selectedValueDatum,
  selectedValueUsluge,
  idLokacije,
  number,
  showIzaberiVreme,
  setshowIzaberiVreme,
}) => {
  return (
    <TouchableOpacity
      style={styles.BtnRezervisiContainer}
      onPress={() => {
        if (
          selectedValueLjekari === "" ||
          selectedValueLjekari === "Izaberite porodičnog" ||
          selectedValueDatum === "" ||
          selectedValueDatum === "Izaberite datum" ||
          selectedValueUsluge === "" ||
          selectedValueUsluge === "Izaberite uslugu" ||
          number === ""
        ) {
          Alert.alert("Obavještenje", "Nisu popunjena sva polja");
        } else {
          setshowIzaberiVreme(!showIzaberiVreme);
          for (let i = 0; i < dataBase.vrijeme.length; i++) {
            dataBase.vrijeme.splice(i);
          }
          let br = false;
          let zauzeto_vrijeme = [];
          let vrijeme_niz = [
            "07:00",
            "07:15",
            "07:30",
            "07:45",
            "08:00",
            "08:15",
            "08:30",
            "08:45",
            "09:00",
            "09:15",
            "09:30",
            "09:45",
            "10:00",
            "10:15",
            "10:30",
            "10:45",
            "11:00",
            "11:15",
            "11:30",
            "11:45",
            "12:00",
            "12:15",
            "12:30",
            "12:45",
            "13:00",
            "13:15",
            "13:30",
            "13:45",
            "14:00",
            "14:15",
            "14:30",
            "14:45",
          ];
          fetch("https://izbjegniguzvu.000webhostapp.com/css/vrijeme.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify({
              doktor: selectedValueLjekari,
              datum: selectedValueDatum,
            }),
          })
            .then((response) => response.text())
            .then((response) => {
              let data = response;
              console.log(data);
              let arr = data.split("\n");
              zauzeto_vrijeme = arr;
              for (let i = 0; i < vrijeme_niz.length; i++) {
                if (zauzeto_vrijeme.includes(vrijeme_niz[i])) {
                  vrijeme_niz.splice(i, 1);
                  i--;
                }
              }
              if (br === false) {
                for (let i = -1; i < vrijeme_niz.length; i++) {
                  if (i === -1) {
                    dataBase.vrijeme.push("Izaberite vrijeme");
                  } else {
                    dataBase.vrijeme.push(vrijeme_niz[i]);
                  }
                }
              }
              br = true;
            })
            .catch((error) => {
              console.error(error);
            });
          //console.log(vrijeme_niz);
        }
      }}
    >
      <Text style={styles.BtnRezervisiText}>Izaberite vreme</Text>
    </TouchableOpacity>
  );
};
const PadajuciMeni = ({ podaci, naziv, dataBase, selectedVal, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return isVisible ? (
    <View>
      <Text style={styles.selectText}>{naziv}</Text>
      <SelectDropdown
        data={dataBase[podaci]}
        defaultValueByIndex={0}
        onSelect={onSelect}
        selectedValue={selectedVal}
        buttonStyle={styles.btnSelect}
        buttonTextStyle={styles.btnSelectText}
      />
    </View>
  ) : null;
};

const PopupRezervisi = ({ idLokacije, dataBase, close, title }) => {
  const [selectedValueLjekari, setSelectedValueLjekari] = React.useState("");
  const [selectedValueUsluge, setSelectedValueUsluge] = React.useState("");
  const [selectedValueDatum, setSelectedValueDatum] = React.useState("");
  const [showIzaberiVreme, setshowIzaberiVreme] = useState(false);
  const [number, onChangeNumber] = React.useState("");

  return (
    <View style={styles.popupRezervisi}>
      <View style={styles.popupHeading}>
        <Text style={styles.popupHeadingh1}>Rezervacija rednog broja</Text>
        <Text style={styles.popupHeadingX} onPress={() => close(false)}>
          X
        </Text>
      </View>
      <Text style={styles.selectText}>Unesite ime i prezime</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Unesite ime i prezime"
        keyboardType="text"
      />
      <View style={styles.selectContainer}>
        <PadajuciMeni
          podaci="ljekari"
          naziv="Porodični"
          dataBase={dataBase}
          selectedValue={selectedValueLjekari}
          onSelect={(item) => {
            setSelectedValueLjekari(item);
          }}
        />
        <PadajuciMeni
          podaci="usluge"
          naziv="Usluge"
          dataBase={dataBase}
          selectedValue={selectedValueUsluge}
          onSelect={(item) => {
            setSelectedValueUsluge(item);
          }}
        />
        <PadajuciMeni
          podaci="datum"
          naziv="Datum"
          dataBase={dataBase}
          selectedValue={selectedValueDatum}
          onSelect={(item) => {
            setSelectedValueDatum(item);
          }}
        />
        <BtnRezervisi
          showIzaberiVreme={showIzaberiVreme}
          close={setshowIzaberiVreme}
          setshowIzaberiVreme={setshowIzaberiVreme}
          selectedValueDatum={selectedValueDatum}
          selectedValueUsluge={selectedValueUsluge}
          selectedValueLjekari={selectedValueLjekari}
          number={number}
          idLokacije={idLokacije}
        />
      </View>
      {showIzaberiVreme && (
        <PopupVreme
          dataBase={dataBase}
          showIzaberiVreme={showIzaberiVreme}
          close={setshowIzaberiVreme}
          setshowIzaberiVreme={setshowIzaberiVreme}
          selectedValueDatum={selectedValueDatum}
          selectedValueUsluge={selectedValueUsluge}
          selectedValueLjekari={selectedValueLjekari}
          number={number}
          idLokacije={idLokacije}
          title={title}
          closeRez={close}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popupRezervisi: {
    paddingTop: 30,
    paddingBottom: 10,
    backgroundColor: "#c02d2d",
    height: "100%",
    width: "100%",
    zIndex: 100,
  },
  popupHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "4%",
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
  selectContainer: {
    height: "100%",
    width: "100%",
  },
  btnSelect: {
    width: "80%",
    alignSelf: "center",
    height: 50,
    color: "white",
    backgroundColor: "white",
    marginBottom: 20,
  },
  selectText: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: "10%",
    color: "white",
  },
  btnSelectText: {
    fontSize: 20,
    marginLeft: "10%",
    color: "c02d2d",
  },
  input: {
    backgroundColor: "white",
    color: "#c02d2d",
    alignSelf: "center",
    height: 50,
    width: "80%",
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
    width: "70%",
    height: "5%",
    marginTop: 10,
  },
  BtnRezervisiText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
export { PopupRezervisi, dataBase };
export function addVreme(selectedValueLjekari, selectedValueDatum) {
  console.log(selectedValueLjekari, selectedValueDatum);
  // rest of your code
}
