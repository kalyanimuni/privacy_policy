import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCQwzuytN0Aa7Mbjv5jcsnnz70qj8ZKyFI",
  authDomain: "aditya-8c581.firebaseapp.com",
  projectId: "aditya-8c581",
  storageBucket: "aditya-8c581.appspot.com",
  messagingSenderId: "1072170533758",
  appId: "1:1072170533758:web:4107688245ebf9867ae92f"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyC_9N_d7aiYUBBY6aD1n_iwS8h_9hh9WIo",
//   authDomain: "c2km-1edcb.firebaseapp.com",
//   projectId: "c2km-1edcb",
//   storageBucket: "c2km-1edcb.appspot.com",
//   messagingSenderId: "591164572909",
//   appId: "1:591164572909:web:01abdaca1442d699b0f8e4",
//   measurementId: "G-3TZBD44X1L",
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
