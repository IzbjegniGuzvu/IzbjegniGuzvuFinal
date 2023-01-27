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
export default Rezervacija;
