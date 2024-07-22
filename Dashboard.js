import React, { useEffect, useState } from "react";
import { Text } from "react-native";
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
  return <Text>Tite</Text>;
};

export default Dashboard;
