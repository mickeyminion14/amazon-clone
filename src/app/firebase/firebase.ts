import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJXhBlmsluRvttzcTFHcqk7Ltq2IS-718",
  authDomain: "clone-98394.firebaseapp.com",
  databaseURL: "https://clone-98394.firebaseio.com",
  projectId: "clone-98394",
  storageBucket: "clone-98394.appspot.com",
  messagingSenderId: "296070219436",
  appId: "1:296070219436:web:026f1ab35d2563a9214109",
  measurementId: "G-GVY2QY65BW",
});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { auth, db };
