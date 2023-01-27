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
  
$sql = "SELECT ID_rezervacije,redni_broj,DATE_FORMAT(vrijeme, '%H:%i') AS vrijeme, datum,CONCAT(Doktori.ime,' ',Doktori.prezime) AS doktor FROM id20108312_izbjegniguzvu.rezervacije JOIN id20108312_izbjegniguzvu.Doktori
WHERE CONCAT(Doktori.ime,' ',Doktori.prezime)='".$doktor."' AND DATE_FORMAT(datum,'%d.%m')=".$datum." AND Doktori.ID_doktor=rezervacije.ID_doktora;";
$result = $conn->query($sql);

$vrijeme_niz= array();
$br=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $vrijeme_niz[$br]=$row["vrijeme"];
    //echo $br;
    $br++;
  }
} else {
  //echo "0 results";
}
$arrlength=count($vrijeme_niz);
//echo $arrlength;
if($arrlength==0){
  echo '0';
}
else{
  for($x=0;$x<$arrlength;$x++){
    echo "{$vrijeme_niz[$x]}\n";
  }
}

$conn->close();

?>