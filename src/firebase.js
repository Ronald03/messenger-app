import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDApqyvE2IgrEwiJKa9dBtBhMCUgrKeshY",
    authDomain: "facebook-messenger-97a4a.firebaseapp.com",
    databaseURL: "https://facebook-messenger-97a4a.firebaseio.com",
    projectId: "facebook-messenger-97a4a",
    storageBucket: "facebook-messenger-97a4a.appspot.com",
    messagingSenderId: "465210291887",
    appId: "1:465210291887:web:557aecbf62e22c31f1c65a",
    measurementId: "G-ZTTLPD4CQP"
});

const db = firebaseApp.firestore();

export default db;