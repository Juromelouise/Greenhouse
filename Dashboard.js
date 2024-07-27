import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import io from "socket.io-client";
import { GlobalContext } from "./GlobalState";
// import { socket } from "./socket";

// const SOCKET_SERVER_URL = "http://192.168.180.169:8080/data";

const Dashboard = () => {
  const { apikey, ip, setIp, setApiKey } = useContext(GlobalContext);

  const [weight1, setWeight1] = useState("(Loading)");
  const [weight2, setWeight2] = useState("(Loading)");
  const [weight3, setWeight3] = useState("(Loading)");
  const [ldrTopLeft, setLdrTopLeft] = useState("Loading...");
  const [ldrBotLeft, setLdrBotLeft] = useState("Loading...");
  const [ldrTopCenter, setLdrTopCenter] = useState("Loading...");
  const [ldrBotCenter, setLdrBotCenter] = useState("Loading...");
  const [ldrTopRight, setTopRight] = useState("Loading...");
  const [ldrBotRight, setBotRight] = useState("Loading...");
  const [current, setCurrent] = useState("(Loading)");

  useEffect(() => {
    const socket = io(ip, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("update", (data) => {
      const { ldr, weight } = data;

      setLdrTopLeft(ldr.left.top);
      setLdrBotLeft(ldr.left.bottom);

      setLdrTopCenter(ldr.center.top);
      setLdrBotCenter(ldr.center.bottom);

      setTopRight(ldr.right.top);
      setBotRight(ldr.right.bottom);

      setWeight1(weight.left);
      setWeight2(weight.center);
      setWeight3(weight.right);
    });

    socket.on("update2", (data) => {
      setCurrent(data.current);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const members = [
    "Cabalbag, Kristel Kaye Coloma",
    "Delda, Marc Andre Labong",
    "Kinoshita, Ryou Garcia",
    "Manuel, Alelie-Ann Ramos",
    "Palima, Shan Castro",
    "Raras, Mary Jane Canoy",
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Group 2</Text>
          <Text style={styles.headerSubtitle}>
            Sustainable Greenhouse Monitoring System
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready to Harvest?</Text>
          <Text>Plant 1: Not ready to harvest</Text>
          <View style={{ marginLeft: 10, marginBottom: 15 }}>
            <Text>LDR Top: {ldrTopLeft}</Text>
            <Text>LDR Bottom: {ldrBotLeft}</Text>
          </View>
          <Text>Plant 2: Not ready to harvest</Text>
          <View style={{ marginLeft: 10, marginBottom: 15 }}>
            <Text>LDR Top: {ldrTopCenter}</Text>
            <Text>LDR Bottom: {ldrBotCenter}</Text>
          </View>
          <Text>Plant 3: Not ready to harvest</Text>
          <View style={{ marginLeft: 10, marginBottom: 15 }}>
            <Text>LDR Top: {ldrTopRight}</Text>
            <Text>LDR Bottom: {ldrBotRight}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>50kg Load Cell Sensor Data</Text>
          <Text>Plant 1 weight: {weight1} Grams</Text>
          <Text>Plant 2 weight: {weight2} Grams</Text>
          <Text>Plant 3 weight: {weight3} Grams</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Sensor Data</Text>
          <Text>Current: {current} Amps</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Members:</Text>
          <FlatList
            data={members}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
        </View>
        <View style={styles.footer}>
          <Text style={{ color: "white" }}>
            Sustainable Greenhouse Monitoring System
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 18,
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: "#333",
    width: "100%",
    alignItems: "center",
  },
});

export default Dashboard;
