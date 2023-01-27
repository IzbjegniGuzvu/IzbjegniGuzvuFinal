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
$usernameLogin="";
$passwordLogin="";
// echo "Connected successfully";
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $usernameLogin = $_POST['name'];
    $passwordLogin = $_POST['password'];
  
    //echo "Name: $usernameLogin, Password: $passwordLogin";
  }

$sql = "SELECT * FROM id20108312_izbjegniguzvu.administratori;";
$result = $conn->query($sql);

$pom=0;
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    if($row["username"]==$usernameLogin&&$row["password"]==$passwordLogin)
    {
        $pom++;
        $pom1=$row["ID_administrator"];
        echo $pom1;
        break;
    }
  }
} else {
  echo "0 results";
}
//echo $pom;
if($pom==0)
{
    echo "false";
}


$conn->close();

?>