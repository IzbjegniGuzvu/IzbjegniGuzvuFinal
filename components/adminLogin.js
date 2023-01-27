import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
let idLokacije;
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSubmit = () => {
    fetch("https://izbjegniguzvu.000webhostapp.com/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${username}&password=${password}`,
    })
      .then((response) => response.text())
      .then((responseText) => {
        let data = responseText;
        if (data === "false") {
          Alert.alert("Obavještenje", "Neuspješna prijava");
        } else {
          idLokacije = data;
          navigation.navigate("Admin", { idLokacije });
          Alert.alert("Obavještenje", "Uspješna prijava");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textAdmin}>Prijava za admina</Text>
      <Text style={styles.texth4}>Unesite vaše korisnicko ime:</Text>
      <TextInput
        style={styles.input}
        placeholder="Korisničko ime"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Text style={styles.texth4}>Unesite vašu lozinku:</Text>
      <TextInput
        style={styles.input}
        placeholder="Lozinka"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Prijavite se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "13%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "87%",
    backgroundColor: "#c02d2d",
    borderColor: "white",
    borderWidth: 1,
    zIndex: 999,
    shadowColor: "black",
    shadowOffset: {
      width: "100%",
      height: "100%",
    },
    shadowOpacity: 1,
    shadowRadius: 1.1,

    elevation: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    backgroundColor: "white",
    //textAlign:'center',
  },
  button: {
    width: "80%",
    padding: 10,
    margin: 10,
    backgroundColor: "#c02d2d",
    borderRadius: 5,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  texth4: {
    color: "white",
    fontSize: 15,
  },
  textAdmin: {
    color: "white",
    fontSize: 30,
    padding: 10,
    marginBottom: "10%",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default LoginForm;
