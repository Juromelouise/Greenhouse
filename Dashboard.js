import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import io from "socket.io-client";

const SOCKET_SERVER_URL = "http://192.168.180.169:8080/data";

const Dashboard = () => {
  const [weight1, setWeight1] = useState("");
  const [weight2, setWeight2] = useState("");
  const [weight3, setWeight3] = useState("");
  const [ldrTopLeft, setLdrTopLeft] = useState("");
  const [ldrBotLeft, setLdrBotLeft] = useState("");
  const [ldrTopCenter, setTopCenter] = useState("");
  const [ldrBotCenter, setLdrBotCenter] = useState("");
  const [ldrTopRight, setTopRight] = useState("");
  const [ldrBotRight, setBotRight] = useState("");
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.on("update", (data) => {
      setWeight1(data);
    });
  });

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
            <Text>LDR Top: 12</Text>
            <Text>LDR Bottom: 12</Text>
          </View>
          <Text>Plant 2: Not ready to harvest</Text>
          <View style={{ marginLeft: 10, marginBottom: 15 }}>
            <Text>LDR Top: 12</Text>
            <Text>LDR Bottom: 12</Text>
          </View>
          <Text>Plant 3: Not ready to harvest</Text>
          <View style={{ marginLeft: 10, marginBottom: 15 }}>
            <Text>LDR Top: 12</Text>
            <Text>LDR Bottom: 12</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>50kg Load Cell Sensor Data</Text>
          <Text>Plant 1 weight: 1203 Grams</Text>
          <Text>Plant 2 weight: 1203 Grams</Text>
          <Text>Plant 3 weight: 1203 Grams</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Sensor Data</Text>
          <Text>Current: 5.5A</Text>
          <Text>Voltage: 5.5V</Text>
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
          <Text style={{ color: 'white' }}>Sustainable Greenhouse Monitoring System</Text>
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
