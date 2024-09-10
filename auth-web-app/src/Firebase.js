import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8qrmx4ViSbzNKvx2kBTtuoC92k21EgdU",
  authDomain: "localhost",
  projectId: "fuelai-task-17",
  storageBucket: "fuelai-task-17.appspot.com",
  messagingSenderId: "662344793706",
  appId: "1:662344793706:web:3b0fa4dec85adf8900d413"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);