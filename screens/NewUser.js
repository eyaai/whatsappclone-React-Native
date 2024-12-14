import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import firebase from '../config';
const auth = firebase.auth();
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function NewUser({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
  
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.statusBar} />
  
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../assets/back.jpg')}
        >
          <View style={styles.authContainer}>
            <Text style={styles.title}>Create New User</Text>
  
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#bbb"
              value={username}
              onChangeText={setUsername}
            />
  
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
  
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
  
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#bbb"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
  
            <TouchableOpacity style={styles.button}>
              <Text
                style={styles.buttonText}
                onPress={() => {
                  auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "acc" }],
                      });
                    })
                    .catch((error) => {
                      alert(error.message);
                    });
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.secondaryButton}>
              <Text
                style={styles.secondaryButtonText}
                onPress={() => navigation.navigate('auth')} // Navigate to Sign In
              >
                Back to Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1e3a5f', // Deep blue background to match Van Gogh aesthetic
      justifyContent: 'flex-start',
    },
    statusBar: {
      height: 40,
      width: '100%',
      backgroundColor: '#1a2a45',
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      opacity: 0.8, // Slightly dim the background for better readability
    },
    authContainer: {
      alignItems: 'center',
      backgroundColor: 'rgba(30, 58, 95, 0.8)', // Deep, translucent blue background
      borderRadius: 15,
      paddingVertical: 25,
      paddingHorizontal: 20,
      width: '85%',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ffc107', // Warm yellow color for the title to contrast with the blue
      marginBottom: 25,
      fontFamily: 'serif', // Add a serif font for an artistic touch
    },
    input: {
      width: '90%',
      backgroundColor: '#3e4c72', // Dark blue background to blend with Van Gogh style
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
      fontSize: 16,
      color: '#fff', // White text for readability
    },
    button: {
      width: '90%',
      backgroundColor: '#ffc107', // Use yellow to highlight the action button
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#1e3a5f',
      fontSize: 16,
      fontWeight: 'bold',
    },
    secondaryButton: {
      marginTop: 15,
      padding: 10,
    },
    secondaryButtonText: {
      color: '#ffc107',
      fontSize: 16,
      textDecorationLine: 'underline',
    },
});

