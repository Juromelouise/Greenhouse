import React from "react";
import { Text, View, Image } from "react-native";

// Function to capitalize the first letter of each word
const capitalizeWords = (str) => {
  return str?.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Function to format common names
const formatCommonNames = (commonNames) => {
  return commonNames?.map(capitalizeWords).join(", ");
};

const Plant = ({ plant }) => {
  const probability = plant?.probability;
  const scientific_name = plant?.name;
  const common_names = formatCommonNames(plant?.details?.common_names); // array
  const description = plant?.details?.description?.value;
  const edible_parts = formatCommonNames(plant?.details?.edible_parts); // array
  const propagation_methods = formatCommonNames(
    plant?.details?.propagation_methods
  ); // array
  const url = plant?.details?.url;

  const image = plant?.details?.image?.value;

  return (
    <View
      style={{ width: 300, display: "flex", flexDirection: "column", gap: 5 }}
    >
      <Image source={{ uri: image }} style={{ height: 300, width: 300 }} />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Probability: </Text>
        <Text style={{ fontStyle: "italic", width: 250 }}>
          {(probability * 100).toFixed(2) + "%"}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Common Names: </Text>
        <Text style={{ fontStyle: "italic", width: 200 }}>{common_names}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Description: </Text>
        <Text style={{ fontStyle: "italic", width: 230 }}>{description}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Scientific Name: </Text>
        <Text style={{ fontStyle: "italic", width: 250 }}>
          {scientific_name}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Propagation Method: </Text>
        <Text style={{ fontStyle: "italic", width: 250 }}>
          {propagation_methods}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>Edible Parts: </Text>
        <Text style={{ fontStyle: "italic", width: 250 }}>{edible_parts}</Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ fontWeight: 900 }}>More info: </Text>
        <Text style={{ fontStyle: "italic", width: 250 }}>{url}</Text>
      </View>
    </View>
  );
};

const img =
  "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQDA9brql0nQRoXFQwBNMIP5lsOeKvoBgYGdbdyaKYHUdPD4dDM";

export default Plant;
