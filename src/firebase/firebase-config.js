import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Configuraciones del firebase para dentro de la app

const firebaseConfig = {
    apiKey: "AIzaSyCJzcKjIhH-0krQRXBvla2VXffL5m4ko50",
    authDomain: "react-app-curso-3ac46.firebaseapp.com",
    projectId: "react-app-curso-3ac46",
    storageBucket: "react-app-curso-3ac46.appspot.com",
    messagingSenderId: "348923846089",
    appId: "1:348923846089:web:f430d176963de45d105c18"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


  export {
      db,
      googleAuthProvider,
      firebase
  };