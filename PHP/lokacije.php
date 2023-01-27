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

$sql = "SELECT * FROM id20108312_izbjegniguzvu.lokacija;";
$result = $conn->query($sql);

$lokacija_niz= array();
$br=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    //echo "ID: " . $row["ID_lokacije"]. "   Mjesto: " . $row["mjesto"]. "   Skracenica:" . $row["skracenica"]. "   Adresa:" . $row["adresa"]. "   Kontakt:" . $row["kontakt"]. "   Radno vrijeme::" . $row["radno_vrijeme"]."<br>";
    $lokacija_niz[$br]=new Lokacija($row["ID_lokacije"],$row["mjesto"],$row["skracenica"],$row["adresa"],$row["kontakt"],$row["radno_vrijeme"]);
    //echo $br;
    $br++;
  }
} else {
  echo "0 results";
}
$lokacija_json = json_encode($lokacija_niz);
$arrlength=count($lokacija_niz);
//echo $arrlength;
for($x=0;$x<$arrlength;$x++)
  {
  echo $lokacija_niz[$x]->toString();
}


  class Lokacija {
    private $ID_lokacije;
    private $mjesto;
    private $skracenica;
    private $adresa;
    private $kontakt;
    private $radno_vrijeme;
  
    public function __construct($ID_lokacije, $mjesto, $skracenica, $adresa, $kontakt, $radno_vrijeme) {
      $this->ID_lokacije = $ID_lokacije;
      $this->mjesto = $mjesto;
      $this->skracenica = $skracenica;
      $this->adresa = $adresa;
      $this->kontakt = $kontakt;
      $this->radno_vrijeme = $radno_vrijeme;
    }
    
    public function toString()
    {
        return "{$this->ID_lokacije}\n{$this->mjesto}\n{$this->skracenica}\n{$this->adresa}\n{$this->kontakt}\n{$this->radno_vrijeme}\n";
    }
  
    public function getIDLokacije() {
      return $this->skracenica;
    }
  }
$conn->close();

?>