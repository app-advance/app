import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLqrNJGOEdOD0BiisiSuhhNTbR47n6HMc",
  authDomain: "app-advance.firebaseapp.com",
  projectId: "app-advance",
  storageBucket: "app-advance.appspot.com",
  messagingSenderId: "271780359765",
  appId: "1:271780359765:web:24f0c6c814f1a8dd72aedc",
};

const initializeAppIfNecessary = () => {
    try {
        return getApp();
    } catch (error) {
        return initializeApp(firebaseConfig)
    }
}

export let app = initializeApp(firebaseConfig);
export const clientAuth = getAuth(app);
export const database = getFirestore(app);
