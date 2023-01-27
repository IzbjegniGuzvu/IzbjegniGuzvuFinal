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
$ID_lokacije = $data['ID_lokacije'];

$sql = "SELECT ID_doktor,CONCAT(ime,' ',prezime) AS ime,ID_lokacije FROM id20108312_izbjegniguzvu.Doktori WHERE ID_lokacije=".$ID_lokacije.";";
$result = $conn->query($sql);

$doktori_niz= array();
$br=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $doktori_niz[$br]=new Doktor($row["ID_doktor"],$row["ime"],$row["ID_lokacije"]);
    $br++;
  }
} else {
  echo "0 results";
}
$arrlength=count($doktori_niz);
//echo $arrlength;
for($x=0;$x<$arrlength;$x++)
{
  echo $doktori_niz[$x]->toString();
}

  class Doktor {
    public $ID_doktora;
    public $ime;
    public $ID_lokacije;

    public function __construct($ID_doktora, $Ime, $ID_lokacije) {
        $this->ID_doktora = $ID_doktora;
        $this->ime = $Ime;
        $this->ID_lokacije = $ID_lokacije;
    }

    public function toString() {
        return "{$this->ID_doktora}\n{$this->ime}\n{$this->ID_lokacije}\n";
    }
}

$conn->close();

?>