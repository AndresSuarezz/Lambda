import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJj34W5zFM1jiKSGqdhp6bG4H9wJf1LWw",
  authDomain: "lambdaapp-ddc3e.firebaseapp.com",
  projectId: "lambdaapp-ddc3e",
  storageBucket: "lambdaapp-ddc3e.appspot.com",
  messagingSenderId: "992816761973",
  appId: "1:992816761973:web:950ebcef66851c9d8d7c3c",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);