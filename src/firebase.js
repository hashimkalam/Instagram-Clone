import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC7_dUjBoEmy3S3yOwqn4FXpKyOaolEVZM",
  authDomain: "instagram-clone-c6234.firebaseapp.com",
  projectId: "instagram-clone-c6234",
  storageBucket: "instagram-clone-c6234.appspot.com",
  messagingSenderId: "1041945371530",
  appId: "1:1041945371530:web:2478751c8f3b7f32939e73",
  measurementId: "G-36QG1QLCK4",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
