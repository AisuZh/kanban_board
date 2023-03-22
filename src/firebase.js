import { useState, useContext, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQ1LfqgYACVj-L65YoKemiyiwX8y_-5N0",
  authDomain: "kanban-board-b1f67.firebaseapp.com",
  projectId: "kanban-board-b1f67",
  storageBucket: "kanban-board-b1f67.appspot.com",
  messagingSenderId: "335402454931",
  appId: "1:335402454931:web:bac683c893b1054e91a266"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const timestamp = serverTimestamp();
const auth = getAuth(app);

export { app, db, timestamp, auth };

export const AuthContext = createContext();
export const DatabaseContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();


  return <AuthContext.Provider value={{ user, error }} {...props} />;
};

export const DatabaseContextProvider = (props) => {
  return <DatabaseContext.Provider value={db} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

export const useDatabase = () => {
  return useContext(DatabaseContext);
};



