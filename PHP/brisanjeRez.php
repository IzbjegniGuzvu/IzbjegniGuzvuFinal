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
  
$sql = "DELETE FROM id20108312_izbjegniguzvu.rezervacije WHERE redni_broj=".$redni_br.";";
if ($conn->query($sql) === TRUE) {
    if(mysqli_affected_rows($conn) == 0) {
        echo "Nijedna rezervacija nije izbrisana, proverite redni broj.";
    }
    else{
     echo "Uspjesno ste izbrisali vasu rezervaciju";
    }
  } else {
    echo "Brisanje rezervacije nije uspjelo";
  }



$conn->close();

?>