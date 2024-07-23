import React, { useContext, useEffect } from "react";
import {
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
} from "react-native";
import { GlobalContext } from "./GlobalState";

const Setting = () => {
  const { apikey, ip, setIp, setApiKey } = useContext(GlobalContext);

  const [api, onChangeText] = React.useState();
  const [address, onChangeNumber] = React.useState("");

  const onSave = () => {
    setApiKey(api?.trim());
    setIp(address?.trim());
  };

  useEffect(() => {
    onChangeText(apikey?.trim());
    onChangeNumber(ip?.trim());
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={api}
        placeholder="Api Key"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={address}
        placeholder="Server Address with Port"
      />
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Button title="Save" onPress={onSave} />
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 100 }}>
        <Text>IP Address: {ip}</Text>
        <Text>Api Key: {apikey}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Setting;
