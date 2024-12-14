import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import firebase from "../config";
const database = firebase.database();
const ref_tableProfils = database.ref("Tabledeprofils");

export default function ListProfils(props) {
  const currentid = props.route.params?.currentid; // Use optional chaining for safety
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    ref_tableProfils.on("value", (snapshot) => {
      const profiles = [];
      snapshot.forEach((unprofil) => {
        const profile = unprofil.val();
        if (profile.id === currentid) {
          setCurrentUser(profile);
        } else {
          profiles.push(profile);
        }
      });
      setData(profiles);
    });

    // Cleanup the listener
    return () => {
      ref_tableProfils.off();
    };
  }, [currentid]);

  return (
    <ImageBackground
      source={require("../assets/back.jpg")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>List of Profiles</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id || Math.random().toString()} // Provide a fallback key
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            {/* Display Profile Image */}
            <Image
              source={{ uri: item.uriImage || "https://via.placeholder.com/50" }} // Fallback for missing image
              style={styles.profileImage}
            />
            <Text
              onPress={() => {
                props.navigation.navigate("chat", {
                  currentUser,
                  secondUser: item,
                });
              }}
              style={styles.textinputstyle}
            >
              {item.nom ? `${item.nom} ${item.pseudo}` : "Unknown User"}
            </Text>
          </View>
        )}
        style={{ width: "90%" }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  textstyle: {
    fontSize: 40,
    fontFamily: "serif",
    color: "white",
    fontWeight: "bold",
    paddingTop: 45,
  },
  container: {
    flex: 1,
    backgroundColor: "#1e3a5f",
    alignItems: "center",
    justifyContent: "center",
  },
});
