import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const Checked = ({ close, closeRez, rezervacija }) => {
  const [showIzbrisi, setShowIzbrisi] = useState(false);
  return (
    <View style={styles.checkedContainer}>
      <View style={styles.checkedHeading}>
        <Text style={styles.heading}>Rezervisani ste:</Text>
        <Text
          onPress={() => {
            close(false);
            closeRez(false);
          }}
          style={styles.headingX}
        >
          X
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Osoba:</Text>
        <Text style={styles.infoText}>{rezervacija.ime}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Usluga:</Text>
        <Text style={styles.infoText}>{rezervacija.usluga}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Datum:</Text>
        <Text style={styles.infoText}>{rezervacija.datum}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Vrijeme:</Text>
        <Text style={styles.infoText}>{rezervacija.vrijeme}</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Vaš redni broj:</Text>
        <Text style={styles.infoText}>{rezervacija.redni_broj}</Text>
      </View>
      <View style={styles.hr} />
      <TouchableOpacity style={styles.btn}>
        <Text
          style={styles.btnText}
          onPress={() => {
            setShowIzbrisi(true);
          }}
        >
          <Text>Izbriši rezervaciju</Text>
        </Text>
      </TouchableOpacity>

      {showIzbrisi && (
        <View style={styles.bodyIzbrisi}>
          <View style={styles.popUpIzbirisi}>
            <View style={styles.popupHeading}>
              <Text style={styles.popupHeadingh1}>Potvrdi obriši</Text>
              <Text
                style={styles.popupHeadingX}
                onPress={() => {
                  setShowIzbrisi(false);
                }}
              >
                <Text>X</Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnIzbrisi}
              onPress={() => {
                fetch(
                  "https://izbjegniguzvu.000webhostapp.com/css/brisanjeRez.php",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify({
                      redni_br: rezervacija.redni_broj,
                    }),
                  }
                )
                  .then((response) => response.text())
                  .then((response) => {
                    let data = response;
                    Alert.alert(
                      "Obavještenje",
                      "Uspješno ste obrisali svoju rezervaciju"
                    );
                  })
                  .catch((error) => {
                    console.error(error);
                  });
                closeRez(false);
              }}
            >
              <Text style={styles.btnTextIzbrisi}>Potrvrdite</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkedContainer: {
    position: "absolute",
    backgroundColor: "#c02d2d",
    height: "100%",
    width: "100%",
    zIndex: 900,
  },
  checkedHeading: {
    marginTop: "10%",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "white",
    padding: "2%",
    marginBottom: "5%",
  },
  heading: {
    fontSize: 30,
    marginRight: 5,
    color: "white",
  },
  headingX: {
    position: "absolute",
    right: "5%",
    fontSize: 25,
    color: "white",
  },
  hr: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: "5%",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoHeading: {
    fontSize: 25,
    marginRight: 5,
    color: "white",
  },
  infoText: {
    fontSize: 20,
    marginRight: 5,
    color: "white",
  },
  btn: {
    marginTop: "15%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    padding: "10%",
    width: "80%",
  },
  btnText: {
    color: "white",
  },
  bodyIzbrisi: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  popUpIzbirisi: {
    position: "absolute",
    top: "15%",
    alignSelf: "center",
    height: "20%",
    width: "80%",
    borderColor: "white",
    borderWidth: 5,
    backgroundColor: "#c02d2d",
  },
  popupHeading: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "25%",
    borderColor: "white",
    borderWidth: 2,
    padding: "5%",
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
    zIndex: 999,
  },
  btnIzbrisi: {
    marginTop: "45%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    padding: "10%",
    width: "80%",
  },
  btnTextIzbrisi: {
    color: "white",
  },
});

export default Checked;
