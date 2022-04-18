import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBPWr2r0xUMznWpPABz9tNVGqWiDCdJD-Y",
    authDomain: "read-quiz.firebaseapp.com",
    databaseURL: "https://read-quiz-default-rtdb.firebaseio.com",
    projectId: "read-quiz",
    storageBucket: "read-quiz.appspot.com",
    messagingSenderId: "60317445813",
    appId: "1:60317445813:web:d532f23b202ddea08d58fc",
    measurementId: "G-ZPH3L91JKD"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;