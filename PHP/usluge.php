<?php

$servername = "localhost";
$username = "id20108312_izbjegni_guzvu";
$password = "Beatovic-555";
$database="id20108312_izbjegniguzvu";

$conn = new mysqli($servername, $username, $password,$database);

//Get Connection
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully". "<br>";

$sql = "SELECT * FROM id20108312_izbjegniguzvu.usluge;";
$result = $conn->query($sql);

$usluge_niz= array();
$br=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    //echo $row["ID_doktora"],$row["ime"],$row["prezime"],$row["ID_lokacije"];
    $usluge_niz[$br]=new Usluga($row["ID_usluge"],$row["ime"],$row["trajanje"]);
    //echo $br;
    $br++;
  }
} else {
  echo "0 results";
}

$arrlength=count($usluge_niz);
//echo $arrlength;
for($x=0;$x<$arrlength;$x++)
{
  echo $usluge_niz[$x]->toString();
}


class Usluga {
    public $ID_usluge;
    public $ime;
    public $trajanje;

    public function __construct($ID_usluge, $Ime, $trajanje) {
        $this->ID_usluge = $ID_usluge;
        $this->ime = $Ime;
        $this->trajanje = $trajanje;
    }

    public function ToString() {
        return "{$this->ID_usluge}\n{$this->ime}\n{$this->trajanje}\n";
    }
}

$conn->close();

?>