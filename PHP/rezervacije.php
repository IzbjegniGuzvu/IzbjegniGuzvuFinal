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
$ID_lok = $data['ID_lok'];
  
$sql = "SELECT ID_rezervacije,redni_broj,TIME_FORMAT(vrijeme, '%H:%i') AS vrijeme,DATE_FORMAT(datum,'%d.%m') AS datum,rezervacije.ime,usluga,CONCAT(Doktori.ime,' ',Doktori.prezime) AS doktor FROM id20108312_izbjegniguzvu.rezervacije JOIN id20108312_izbjegniguzvu.lokacija JOIN id20108312_izbjegniguzvu.Doktori WHERE ".$ID_lok."=lokacija.ID_lokacije AND
".$ID_lok."=rezervacije.ID_lokacije
AND rezervacije.ID_doktora=Doktori.ID_doktor;";
$result = $conn->query($sql);

$rezervacija_niz= array();
$br=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $rezervacija_niz[$br]=new Rezervacija($row["ID_rezervacije"],$row["redni_broj"],$row["vrijeme"],$row["datum"],$row["ime"],$row["usluga"],$row["doktor"]);
    //echo $br;
    $br++;
  }
} else {
  echo "0 results";
}
$arrlength=count($rezervacija_niz);
//echo $arrlength;
for($x=0;$x<$arrlength;$x++)
{
  echo $rezervacija_niz[$x]->toString();
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