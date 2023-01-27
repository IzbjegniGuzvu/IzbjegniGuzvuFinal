import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/home";
import Pocetna from "./components/pocetna";
import Tabela from "./components/administrator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.body}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Izaberite lokaciju"
            component={Pocetna}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Izaberite uslugu"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Admin"
            component={Tabela}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
  },
});
export default App;
