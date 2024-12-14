// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGll7rLiAxssKZ5XAPPBNr8Vk837Gp6RA",
  authDomain: "whatsappclone-8e4fe.firebaseapp.com",
  databaseURL: "https://whatsappclone-8e4fe-default-rtdb.firebaseio.com",
  projectId: "whatsappclone-8e4fe",
  storageBucket: "whatsappclone-8e4fe.firebasestorage.app",
  messagingSenderId: "791552858241",
  appId: "1:791552858241:web:a8188f40cf75b5511c1580",
  measurementId: "G-ZRRVTXPM7Y"
};

// Initialize Firebase
const initApp = app.initializeApp(firebaseConfig);
console.log("aaaaaaaaaa");


export default initApp;
