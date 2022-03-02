import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDbLKF_0DWYJWuWYSqyJXPa5sFkcLWyoD8",
  authDomain: "neoculturation-70d1f.firebaseapp.com",
  databaseURL: "https://neoculturation-70d1f-default-rtdb.firebaseio.com",
  projectId: "neoculturation-70d1f",
  storageBucket: "neoculturation-70d1f.appspot.com",
  messagingSenderId: "958303581237",
  appId: "1:958303581237:web:8308542e326653290b6d7c"
});

var db = firebase.firestore();
export {firebaseConfig,db};