// src/Config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJ5WA794r0ogPCOIEtSqx_iprFG_jSEAE",
  authDomain: "foodiebuzz-a2196.firebaseapp.com",
  projectId: "foodiebuzz-a2196",
  storageBucket: "foodiebuzz-a2196.appspot.com",
  messagingSenderId: "145820850289",
  appId: "1:145820850289:web:36f0a0edcabda3776423d0",
  measurementId: "G-T74S17Q210"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
