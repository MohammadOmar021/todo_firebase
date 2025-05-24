
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-analytics.js";
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,updateProfile  } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { updateDoc, getFirestore, collection, addDoc, setDoc, doc,  getDocs, serverTimestamp, onSnapshot, deleteDoc,query, where } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js"; // add this too

const firebaseConfig = {
  apiKey: "AIzaSyCH5KkOHorvNg4OxZIykCfGU3GzZafffVQ",
  authDomain: "todo-app-ea38f.firebaseapp.com",
  projectId: "todo-app-ea38f",
  storageBucket: "todo-app-ea38f.appspot.com",
  messagingSenderId: "949988576307",
  appId: "1:949988576307:web:dfcefa189ea049f2eda746",
  measurementId: "G-8H1X78M1KH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  addDoc,
  setDoc,
  doc,
  db,
  signInWithEmailAndPassword,
collection, 
getDocs,
onAuthStateChanged,
updateProfile,
signOut,
serverTimestamp,
onSnapshot,
deleteDoc,
updateDoc,
query, 
where
};
