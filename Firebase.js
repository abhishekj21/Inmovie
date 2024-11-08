// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/cordova";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA9SGeybFMtVpNea6VQ52XEQbcWj_Y6JtE",
  authDomain: "inmovie-aedc1.firebaseapp.com",
  projectId: "inmovie-aedc1",
  storageBucket: "inmovie-aedc1.firebasestorage.app",
  messagingSenderId: "907263346364",
  appId: "1:907263346364:web:c951996e664b5b098cb2b9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = () => {
  signOut(auth);
};
export { auth, db, login, signup, logout };
