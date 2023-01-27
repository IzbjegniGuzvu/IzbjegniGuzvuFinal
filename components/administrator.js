import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Header from "./adminHeader";
import Rezervacija from "./clasaRezervacije";
let rezervacija_niz = [];
let rezervacija = {};
let redni_br;
function BrisanjeRez({ redni_br }) {
  fetch("https://izbjegniguzvu.000webhostapp.com/css/brisanjeRez.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      redni_br: redni_br,
    }),
  })
    .then((response) => response.text())
    .then((response) => {
      let data = response;
      Alert.alert("Obavještenje", "Obrisali ste rezervaciju");
    })
    .catch((error) => {
      console.error(error);
    });
}

function UcitavanjeRez({
  idLokacije,
  setshowIzbrisi,
  reservations,
  setReservations,
}) {
  useEffect(() => {
    rezervacija_niz = [];
    rezervacija = {};
    fetch("https://izbjegniguzvu.000webhostapp.com/css/rezervacije.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        ID_lok: idLokacije,
      }),
    })
      .then((response) => response.text())
      .then((response) => {
        let data = response;
        //console.log(data);
        const arr = data.split("\n");
        let brojac = 0;
        let ID_rezervacije;
        let redni_broj;
        let vrijeme;
        let datum;
        let ime;
        let usluga;
        let doktor;
        for (let i = 0; i < arr.length; i++) {
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
            // console.log(rezervacija);
            rezervacija_niz.push(rezervacija);
          }
        }
        setReservations(rezervacija_niz);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [idLokacije]);
  let reservationRows = [];
  reservationRows = reservations.map((rezervacija) => {
    return (
      <View style={styles.tableRow} key={rezervacija.redni_broj}>
        <Text style={styles.tableHeader}>{rezervacija.redni_broj}</Text>
        <Text style={styles.tableHeader}>{rezervacija.vrijeme}</Text>
        <Text style={styles.tableHeader}>{rezervacija.datum}</Text>
        <Text style={styles.tableHeader}>{rezervacija.doktor}</Text>
        <Text style={styles.tableHeader}>{rezervacija.ime}</Text>
        <Text style={styles.tableHeader}>{rezervacija.usluga}</Text>
        <Text
          style={styles.tableHeader}
          onPress={() => {
            setshowIzbrisi(true);
            redni_br = rezervacija.redni_broj;
          }}
        >
          X
        </Text>
      </View>
    );
  });
  return reservationRows;
}
const Tabela = ({ route }) => {
  const { idLokacije } = route.params;
  const [showIzbrisi, setshowIzbrisi] = React.useState(false);
  const [reservations, setReservations] = useState([]);
  // const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await fetch(
        "https://izbjegniguzvu.000webhostapp.com/css/rezervacije.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            ID_lok: idLokacije,
          }),
        }
      );
      const data = await response.text();
      const arr = data.split("\n");
      let brojac = 0;
      let ID_rezervacije;
      let redni_broj;
      let vrijeme;
      let datum;
      let ime;
      let usluga;
      let doktor;
      let updatedReservations = [];
      for (let i = 0; i < arr.length; i++) {
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
          updatedReservations.push(rezervacija);
        }
      }
      setReservations(updatedReservations);
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };
  return (
    <View style={styles.body}>
      <Header />
      <ScrollView
        style={styles.tableContainer}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Redni br.</Text>
          <Text style={styles.tableHeader}>Vreme</Text>
          <Text style={styles.tableHeader}>Datum</Text>
          <Text style={styles.tableHeader}>Porodični</Text>
          <Text style={styles.tableHeader}>Ime</Text>
          <Text style={styles.tableHeader}>Usluga</Text>
          <Text style={styles.tableHeader}>Izbriši</Text>
        </View>
        {UcitavanjeRez({
          idLokacije,
          setshowIzbrisi,
          showIzbrisi,
          reservations,
          setReservations,
        })}
      </ScrollView>

      {showIzbrisi && (
        <View style={styles.bodyIzbirisi}>
          <View style={styles.confirmContainer}>
            <View style={styles.confirmContainerHeader}>
              <Text style={styles.confirmText}>
                Jeste li sigurni da želite obrisati korisnika?
              </Text>
              <Text
                style={styles.confirmTextX}
                onPress={() => {
                  setshowIzbrisi(false);
                }}
              >
                X
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                {
                  BrisanjeRez({ redni_br });
                }
                setshowIzbrisi(false);
                // navigation.navigate("Admin", { idLokacije });
              }}
            >
              <Text>Izbriši</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgb(155,1,10)",
  },
  bodyIzbirisi: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  tableContainer: {
    width: "100%",
    height: "100%",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "white",
    borderWidth: 2,
  },
  tableHeader: {
    flexWrap: "wrap",
    width: "14.2%",
    padding: 2,
    fontWeight: "bold",
    borderColor: "white",
    borderWidth: 1,
    fontSize: 11,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },

  confirmContainer: {
    top: "25%",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#f44336",
    borderColor: "white",
    borderWidth: 4,
  },
  confirmContainerHeader: {
    position: "absolute",
    width: "100%",
    top: 0,
    display: "flex",
    flexDirection: "row",
    borderColor: "white",
    borderWidth: 4,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    color: "white",
  },
  confirmTextX: {
    position: "absolute",
    right: "5%",
    fontSize: 18,
    color: "white",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    width: "40%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Tabela;
