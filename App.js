import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import MyTabs from "./MyTabs";
import { GlobalProvider, GlobalContext } from "./GlobalState";

const App = () => {
  const { apikey } = useContext(GlobalContext);

  useEffect(() => {
    if (!apikey) {
      alert("Please put API KEY");
    }
  }, []);

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};


const AppWrapper = () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
