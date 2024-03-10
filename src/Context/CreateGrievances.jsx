import React, { createContext, useContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyCQwzuytN0Aa7Mbjv5jcsnnz70qj8ZKyFI",
    authDomain: "aditya-8c581.firebaseapp.com",
    projectId: "aditya-8c581",
    storageBucket: "aditya-8c581.appspot.com",
    messagingSenderId: "1072170533758",
    appId: "1:1072170533758:web:4107688245ebf9867ae92f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Function to check if the 'grievances' collection exists
const checkGrievancesCollection = async () => {
    const db = firebase.firestore();
    const grievancesRef = db.collection('grievances');
    const snapshot = await grievancesRef.get();
    return !snapshot.empty; // Return true if collection exists, false otherwise
};

// Provider component to provide Firebase instance to the entire app
export const FirebaseProvider = ({ children }) => {
    return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>;
};

// Custom hook to use Firebase instance
export const useFirebase = () => {
    return useContext(FirebaseContext);
};

// Function to add data to the 'grievances' collection
export const addGrievance = async (formData) => {
    const db = firebase.firestore();
    const grievancesRef = db.collection('grievances');

    // Check if 'grievances' collection exists
    const collectionExists = await checkGrievancesCollection();

    // If collection doesn't exist, create it
    if (!collectionExists) {
        await grievancesRef.doc('init').set({}); // Add a dummy document to create the collection
    }

    // Add form data to the 'grievances' collection
    await grievancesRef.add(formData);
};
