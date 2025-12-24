import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5V1OLyB75ez9F_-QADYuL33p54hIzUC0",
  authDomain: "mec-portal-auth.firebaseapp.com",
  projectId: "mec-portal-auth",
  storageBucket: "mec-portal-auth.firebasestorage.app",
  messagingSenderId: "425642142036",
  appId: "1:425642142036:web:932112225c53b7b80000c1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);