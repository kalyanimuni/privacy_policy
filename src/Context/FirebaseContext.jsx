import React, { createContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase';

// Custom user context
const CustomUserContext = createContext({
  customUserData: [],
  loading: true,
  error: null,
});

const CustomUserContextProvider = ({ children }) => {
  const [customUserData, setCustomUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomUserData = async () => {
      try {
        const customUserCollectionRef = collection(db, 'customUser');
        const querySnapshot = await getDocs(customUserCollectionRef);

        setCustomUserData(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (err) {
        console.error('Error fetching custom user data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomUserData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'customUser'), (querySnapshot) => {
      setCustomUserData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [db]);

  const contextValue = {
    customUserData,
    loading,
    error,
  };

  return (
    <CustomUserContext.Provider value={contextValue}>
      {children}
    </CustomUserContext.Provider>
  );
};

export { CustomUserContext, CustomUserContextProvider };
