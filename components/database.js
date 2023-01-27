import React from "react";
import moment from "moment";
import { dataBase, IzaberiVreme, PopupRezervisi } from "./popupsRezervisi";

/*----------------------------------------------------------------------*/
/*----------------------------DOKTORI-------------------------------------*/
/*----------------------------------------------------------------------*/
function AddDoktori({ idLokacije }) {
  let br = false;
  for (let i = 0; i < dataBase.ljekari.length; i++) {
    dataBase.ljekari.splice(i);
  }
  let doktor_niz = [];
  fetch("https://izbjegniguzvu.000webhostapp.com/css/doktori.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      ID_lokacije: idLokacije,
    }),
  })
    .then((response) => response.text())
    .then((response) => {
      let data = response;
      const arr = data.split("\n");
      let brojac = 0;
      let ID_doktora;
      let ime;
      let ID_lokacije;
      for (let i in arr) {
        brojac++;
        if (brojac === 1) {
          ID_doktora = arr[i];
        } else if (brojac === 2) {
          ime = arr[i];
        } else if (brojac === 3) {
          ID_lokacije = arr[i];
          let doktor = new Doktor(ID_doktora, ime, ID_lokacije);
          doktor_niz.push(doktor);
          brojac = 0;
        }
      }
      let nizImena = [];
      doktor_niz.forEach((doktor) => {
        nizImena.push(doktor.ime);
      });
      if (br === false) {
        for (let i = -1; i < nizImena.length; i++) {
          if (i === -1) {
            dataBase.ljekari.push("Izaberite porodičnog");
          } else {
            dataBase.ljekari.push(nizImena[i]);
          }
        }
        br = true;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

class Doktor {
  constructor(ID_doktora, ime, ID_lokacije) {
    this.ID_doktora = ID_doktora;
    this.ime = ime;
    this.ID_lokacije = ID_lokacije;
  }
}
/*----------------------------------------------------------------------*/
/*----------------------------DOKTORI-------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------USLUGE-------------------------------------*/
/*----------------------------------------------------------------------*/
function AddUsluge() {
  let br = false;
  for (let i = 0; i < dataBase.usluge.length; i++) {
    dataBase.usluge.splice(i);
  }
  let usluge_niz = [];
  fetch("https://izbjegniguzvu.000webhostapp.com/css/usluge.php", {})
    .then((response) => response.text())
    .then((response) => {
      let data = response;
      //console.log(data);
      const arr = data.split("\n");
      let brojac = 0;
      let ID_usluge;
      let ime;
      let trajanje;
      for (let i in arr) {
        brojac++;
        if (brojac === 1) {
          ID_usluge = arr[i];
        } else if (brojac === 2) {
          ime = arr[i];
        } else if (brojac === 3) {
          trajanje = arr[i];
          let usluga = new Usluga(ID_usluge, ime, trajanje);
          usluge_niz.push(usluga);
          brojac = 0;
        }
      }
      let nizUsluga = [];
      usluge_niz.forEach((niz) => {
        nizUsluga.push(niz.ime);
      });
      if (br === false) {
        for (let i = -1; i < nizUsluga.length; i++) {
          if (i === -1) {
            dataBase.usluge.push("Izaberite uslugu");
          } else {
            dataBase.usluge.push(nizUsluga[i]);
          }
        }
      }
      br = true;
    })
    .catch((error) => {
      alert(error);
    });
}

class Usluga {
  constructor(ID_usluge, ime, trajanje) {
    this.ID_usluge = ID_usluge;
    this.ime = ime;
    this.trajanje = trajanje;
  }
}
/*----------------------------------------------------------------------*/
/*----------------------------VREME-------------------------------------*/
/*----------------------------------------------------------------------*/
function AddVrijeme({ selectedValueLjekari, selectedValueDatum }) {
  for (let i = 0; i < dataBase.vrijeme.length; i++) {
    dataBase.vrijeme.splice(i);
  }
  let br = false;
  let zauzeto_vrijeme = [];
  vrijeme_niz = [
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
      //console.log(data);
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
  console.log(zauzeto_vrijeme[0]);
}
/*----------------------------------------------------------------------*/
/*----------------------------VREME-------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------------------------------------------------*/
/*----------------------------DATUM-------------------------------------*/
/*----------------------------------------------------------------------*/
function CurDate() {
  let br = false;
  for (let i = 0; i < dataBase.datum.length; i++) {
    dataBase.datum.splice(i);
  }
  const currentDate = moment();
  let nextDate = currentDate;
  const days = [currentDate.format("DD.MM")];
  for (let i = 0; i < 5; i++) {
    nextDate = nextDate.add(1, "days");
    if (nextDate.day() !== 0 && nextDate.day() !== 6) {
      days.push(nextDate.format("DD.MM"));
    } else {
      i--;
    }
  }
  if (br === false) {
    for (let i = -1; i < days.length; i++) {
      if (i === -1) {
        dataBase.datum.push("Izaberite datum");
      } else {
        dataBase.datum.push(days[i]);
      }
    }
    br = true;
  }
}
export { AddDoktori, AddUsluge, CurDate, AddVrijeme };
