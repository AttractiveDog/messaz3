import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyB_XUjbPJdbqgeSjvKcmLAsGuKuIMfs3Pc",
    authDomain: "messaz-6a603.firebaseapp.com",
    databaseURL: "https://messaz-6a603.firebaseio.com",
    projectId: "messaz-6a603",
    storageBucket: "messaz-6a603.appspot.com",
    messagingSenderId: "243104269927",
    appId: "1:243104269927:web:322a9739dca5372af576c2",
    measurementId: "G-RES105NM4W"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export { auth, provider};
  export default db;
