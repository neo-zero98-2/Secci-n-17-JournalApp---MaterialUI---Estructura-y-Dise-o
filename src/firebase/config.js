// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo-mNkKN4okvPIAe7CeJU6s16gVaeTNys",
  authDomain: "react-app-curso-f2823.firebaseapp.com",
  projectId: "react-app-curso-f2823",
  storageBucket: "react-app-curso-f2823.appspot.com",
  messagingSenderId: "780513331970",
  appId: "1:780513331970:web:8af5612d7d7caaf139901b",
  measurementId: "G-CKTVPN8MYT"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
// const analytics = getAnalytics(app);