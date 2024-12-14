import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../config/index";
import supabase from "../config/supabaseClient";
const auth = firebase.auth()
import { useNavigation } from "@react-navigation/native";
import { decode } from "base64-arraybuffer";
import { supabaseUrl } from "../config/supabaseClient";

const database = firebase.database();
const ref_tableProfils = database.ref("Tabledeprofils");

export default function MyProfil(props) {
  const [uriImage, setUriImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [nom, setNom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [telephone, setTelephone] = useState("");
  const [currentid, setCurrentid] = useState(auth.currentUser.uid);
  const navigation = useNavigation()
  const [base64, setBase64] = useState('')

  useEffect(() => {
    const userProfileRef = ref_tableProfils.child(`unprofil${currentid}`);
    userProfileRef.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNom(data.nom || "");
        setPseudo(data.pseudo || "");
        setTelephone(data.telephone || "");
        if (data.profileImage) {
          setUriImage(data.profileImage);
          // setIsDefaultImage(false);
        }
      }
    });

    return () => userProfileRef.off();
  }, []);

  // Function to request permissions for media library
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "We need access to your photo library to select images."
        );
      }
    };

    requestPermissions();
  }, []);

  // Open the image picker
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });

      if (!result.canceled) {
        setUriImage(result.assets[0].uri);
        setBase64(result.assets[0].base64)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick an image.");
    }
  };

  const uploadImageToSupabase = async (uri) => {
    try {
      const fileName = `${currentid}-${Date.now()}.jpg`;
      const { data, error } = await supabase.storage
        .from("profiles-images")
        .upload(fileName, decode(uri), { contentType: "image/jpeg" });

      if (error) {
        console.log(error);
        throw error;
      }

      const imageUrl =
        supabaseUrl +
        "/storage/v1/object/public/" +
        data.fullPath;

      setUriImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const saveProfile = async () => {
    try {
      let imageUrl = null;

      if (base64) {
        await uploadImageToSupabase(base64);
      }

      const ref_unprofil = ref_tableProfils.child(`unprofil${currentid}`);
      await ref_unprofil.set({
        id: currentid,
        nom,
        pseudo,
        telephone,
        uriImage: uriImage || "",
      });

      Alert.alert("Success", "Profile saved successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile data.");
    }
  };

  const handleDisconnect = () => {
    auth.signOut();
    navigation.replace("auth");

    const userProfileRef = ref_tableProfils.child(`unprofil${currentid}`);
    if (userProfileRef) {
      userProfileRef.update({ isConnected: false });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={nom}
        onChangeText={setNom}
        placeholder="Enter your name"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={pseudo}
        onChangeText={setPseudo}
        placeholder="Enter your username"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={telephone}
        onChangeText={setTelephone}
        placeholder="Enter your phone number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
      />

      <TouchableHighlight style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableHighlight>

      {uriImage && <Image source={{ uri: uriImage }} style={styles.imagePreview} />}

      {uploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text>Uploading... {Math.round(uploadProgress)}%</Text>
        </View>
      )}

      <TouchableHighlight
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={saveProfile}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, uploading && styles.buttonDisabled]}
        onPress={handleDisconnect}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    backgroundColor: "#a0c4ff",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 15,
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
});
