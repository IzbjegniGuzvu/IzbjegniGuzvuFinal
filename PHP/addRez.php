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
$doktor = $data['doktor'];
$datum = $data['datum'];
$vrijeme = $data['vrijeme'];
$ID_lokacije = $data['ID_lokacije'];
$usluga = $data['usluga'];
$ime = $data['ime'];
  
$sqlRead = "SELECT ID_doktor,CONCAT(Doktori.ime,' ',Doktori.prezime) AS doktor FROM id20108312_izbjegniguzvu.Doktori
WHERE CONCAT(Doktori.ime,' ',Doktori.prezime)='".$doktor."';";
$result = $conn->query($sqlRead);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $ID_doktor=$row["ID_doktor"];
  }
} else {
  echo "0 results";
}
$sqlInsert="INSERT INTO id20108312_izbjegniguzvu.rezervacije(redni_broj,vrijeme,datum,ID_lokacije,ime,usluga,ID_doktora)
VALUES (FLOOR(100 + (RAND() * 900)),TIME(STR_TO_DATE('".$vrijeme."', '%H:%i')),CONCAT(YEAR(CURDATE()),'-',DATE_FORMAT(STR_TO_DATE('".$datum."', '%d.%m'),'%m-%d')),".$ID_lokacije.",'".$ime."','".$usluga."',".$ID_doktor.");
";
$br=0;
//echo "{$doktor}\n{$datum}\n{$vrijeme}\n{$ID_lokacije}\n{$usluga}\n{$ID_doktor}\n{$ime}";
do{
  if ($conn->query($sqlInsert) === TRUE) {
  $br++;
  echo "Uspjesna rezervacija\n";
} else {
  //echo "Error: " . $sqlInsert . "<br>" . $conn->error;
}
}while($br==0);
$sqlRead1="SELECT ID_rezervacije,redni_broj,TIME_FORMAT(vrijeme, '%H:%i') AS vrijeme,DATE_FORMAT(datum,'%d.%m') AS datum,rezervacije.ime,usluga,CONCAT(Doktori.ime,' ',Doktori.prezime) AS doktor FROM id20108312_izbjegniguzvu.rezervacije JOIN id20108312_izbjegniguzvu.lokacija JOIN id20108312_izbjegniguzvu.Doktori WHERE rezervacije.ID_doktora=Doktori.ID_doktor ORDER BY ID_rezervacije DESC LIMIT 1";
$result = $conn->query($sqlRead1);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
   $rezervacija=new Rezervacija($row["ID_rezervacije"],$row["redni_broj"],$row["vrijeme"],$row["datum"],$row["ime"],$row["usluga"],$row["doktor"]);
   echo $rezervacija->toString();
  }
} else {
  echo "0 results";
}

class Rezervacija {
    private $ID_rezervacije;
    private $redni_broj;
    private $vrijeme;
    private $datum;
    private $ime;
    private $usluga;
    private $doktor;
  
    public function __construct($ID_rezervacije, $redni_broj, $vrijeme, $datum,  $ime,$usluga,$doktor) {
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