import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

{/*before 2.0*/ }
const firebaseConfig = {
  apiKey: "AIzaSyAI0LDv9Hu4crQyvK_lseqNu-liAuzfmZU",
  authDomain: "hotel-management-system-cf527.firebaseapp.com",
  databaseURL: "https://hotel-management-system-cf527-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-management-system-cf527",
  storageBucket: "hotel-management-system-cf527.appspot.com",
  messagingSenderId: "931947047290",
  appId: "1:931947047290:web:5d7e34781cb394af5a0ec3"
};

{/**/ }
{/* after 2.0 */ }
{/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  projectId: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
  storageBucket: process.env.REACT_APP_FIREBASE_MESSEAGING_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_ID,
};
*/}
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore()

export { app, firestore, storage, db };
