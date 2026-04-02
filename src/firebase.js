// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB4LRMgCsV7Ngsx-mQebe3j69jejrklSl4",
  authDomain: "my-store-2f36e.firebaseapp.com",
  projectId: "my-store-2f36e",
  storageBucket: "my-store-2f36e.firebasestorage.app",
  messagingSenderId: "1072305534058",
  appId: "1:1072305534058:web:2dc73da31e346324b74613",
  measurementId: "G-0FKRWP9G4J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
