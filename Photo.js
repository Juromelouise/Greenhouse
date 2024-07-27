"use strict";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import axios from "axios";
import Plant from "./Plant";
import { GlobalContext } from "./GlobalState";

// const API_KEY = "KAWOOQR0sefargYA2neMtNQfkLlWhfcwfkqFa2HQCiJot6lRxL";

const Photo = () => {
  const [image, setImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [hasResult, setHasResult] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [buttonTitle, setButtonTitle] = useState("See more related results");
  const [loading, setLoading] = useState(false);
  const [plant, setPlant] = useState({});

  const { apikey, ip, setIp, setApiKey } = useContext(GlobalContext);

  // console.log(`${ip}/plant-health`);

  const postToServer = async (health, plant) => {
    try {
      const diseases = health?.disease?.suggestions?.map((disease) => {
        return {
          name: disease.name,
          probability: (disease.probability * 100).toFixed(2) + "%",
          description: disease.details.description,
          treatment: disease.details.treatment,
        };
      });

      const data = {
        plant: {
          plant_names: plant?.details?.common_names,
          plant_description: plant.details?.description?.value,
          // plant_image: image,
        },
        diseases: diseases,
      };

      // CREATE AXIOS POST
      console.log(data);

      const response = await axios.post(`${ip}/plant-health`, data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const healthAssesment = async (base64Image, data) => {
    try {
      const response = await axios.post(
        `https://plant.id/api/v3/health_assessment?details=local_name,description,url,treatment,common_names`,
        {
          images: [base64Image],
          similar_images: true,
          latitude: 13.8162016,
          longitude: 121.2740813,
        },
        {
          headers: {
            "Api-Key": apikey,
            "Content-Type": "application/json",
          },
        }
      );
      postToServer(response.data.result, data);
    } catch (err) {
      console.log(err);
      resetData();
    }
  };

  const resetData = () => {
    setHasResult(false);
    setSeeMore(false);
    setButtonTitle("See more related results");
    setSuggestions([]);
  };

  const indentifyImage = async (base64Image) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods`,
        {
          images: [base64Image],
          similar_images: true,
        },
        {
          headers: {
            "Api-Key": apikey,
            "Content-Type": "application/json",
          },
        }
      );

      setPlant(response.data.result.classification.suggestions[0]);
      setSuggestions(response.data.result.classification.suggestions);
      healthAssesment(
        base64Image,
        response.data.result.classification.suggestions[0]
      );
      setHasResult(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      resetData();
      alert("You may want to change the API_KEY for plant detection");
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].base64);
      indentifyImage(result.assets[0].base64);
      // healthAssesment(result.assets[0].base64);
    }
  };

  const takePhoto = async () => {
    const c = await ImagePicker.requestCameraPermissionsAsync();

    if (c.status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        // console.log(result.assets);
        // setImage(result.assets[0].base64);
        indentifyImage(result.assets[0].base64);
      }
    }
  };

  return (
    <ScrollView>
      {!loading ? (
        <View style={styles.container}>
          {!hasResult ? (
            <>
              <Button title="Take a Photo" onPress={takePhoto} />
              <View style={{ marginTop: 30 }}></View>
              <Button title="Pick an Image" onPress={pickImage} />
            </>
          ) : (
            <>
              {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
              <Plant plant={suggestions[0]} />
              <View style={{ marginTop: 15 }}></View>
              <View style={{ width: "70%" }}>
                <Button
                  title="Reset"
                  onPress={() => {
                    setHasResult(!hasResult);
                    setSeeMore(false);
                    setButtonTitle("See more related results");
                    setSuggestions([]);
                  }}
                />
              </View>
              <View style={{ marginTop: 15 }}></View>
              <View style={{ width: "70%" }}>
                <Button
                  title={buttonTitle}
                  onPress={() => {
                    setSeeMore(!seeMore);
                    if (!seeMore) {
                      setButtonTitle("Hide other results");
                    } else {
                      setButtonTitle("See more related results");
                    }
                  }}
                />
              </View>
              <View style={{ marginTop: 15 }}></View>
              {seeMore && (
                <>
                  {suggestions.slice(1).map((item, index) => (
                    <>
                      <View
                        style={{
                          marginTop: 20,
                          width: "100%",
                          borderTopColor: "black",
                          borderWidth: 2,
                          borderStyle: "solid",
                        }}
                      ></View>
                      <View style={{ marginTop: 20 }}></View>
                      <Plant plant={item} />
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      ) : (
        <>
          <View style={[styles.container]}>
            <Text style={{ marginTop: 200, fontSize: 18 }}>
              Processing image please wait...
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Photo;
