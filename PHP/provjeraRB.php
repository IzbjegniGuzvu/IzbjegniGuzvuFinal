<?php

$servername = "localhost";
$username = "id20108312_izbjegni_guzvu";
$password = "Beatovic-555";
$database="id20108312_izbjegniguzvu";

$conn = new mysqli($servername, $username, $password,$database);


if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
$data = json_decode(file_get_contents('php://input'), true);
$redni_br = $data['redni_br'];
$ime = $data['ime'];
//echo $ime." ".$redni_br;
$sql = "SELECT ID_rezervacije,redni_broj,TIME_FORMAT(vrijeme, '%H:%i') AS vrijeme,DATE_FORMAT(datum,'%d.%m') AS datum,rezervacije.ime,usluga,CONCAT(Doktori.ime,' ',Doktori.prezime) AS doktor FROM id20108312_izbjegniguzvu.rezervacije JOIN id20108312_izbjegniguzvu.lokacija JOIN id20108312_izbjegniguzvu.Doktori WHERE rezervacije.redni_broj=".$redni_br." AND rezervacije.ime='".$ime."'
AND rezervacije.ID_doktora=Doktori.ID_doktor AND rezervacije.ID_lokacije=lokacija.ID_lokacije;";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $rezervacija=new Rezervacija($row["ID_rezervacije"],$row["redni_broj"],$row["vrijeme"],$row["datum"],$row["ime"],$row["usluga"],$row["doktor"]);
    echo $rezervacija->toString();
  }
} else {
  echo "Neispravan unos";
}
class Rezervacija {
    private $ID_rezervacije;
    private $redni_broj;
    private $vrijeme;
    private $datum;
    private $ime;
    private $usluga;
    private $doktor;
  
    public function __construct($ID_rezervacije, $redni_broj, $vrijeme, $datum, $ime,$usluga,$doktor) {
      $this->ID_rezervacije = $ID_rezervacije;
      $this->redni_broj = $redni_broj;
      $this->vrijeme = $vrijeme;
      $this->datum = $datum;
      $this->ime = $ime;
      $this->usluga = $usluga;
      $this->doktor = $doktor;
    }
    
    public function toString()
    {
        return "{$this->ID_rezervacije}\n{$this->redni_broj}\n{$this->vrijeme}\n{$this->datum}\n{$this->ime}\n{$this->usluga}\n{$this->doktor}\n";
    }

  }


$conn->close();

?>