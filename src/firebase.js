// import {initializeApp} from 'firebase/app'
// import { getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged} from "firebase/auth";
// import { useState, useEffect, useContext, createContext } from 'react'


// const firebaseConfig = {
//     apiKey: "AIzaSyBQ1LfqgYACVj-L65YoKemiyiwX8y_-5N0",
//     authDomain: "kanban-board-b1f67.firebaseapp.com",
//     projectId: "kanban-board-b1f67",
//     storageBucket: "kanban-board-b1f67.appspot.com",
//     messagingSenderId: "335402454931",
//     appId: "1:335402454931:web:bac683c893b1054e91a266"
//   };

//   const app = initializeApp(firebaseConfig)
//   const db = getFirestore(app);
//   const timestamp = serverTimestamp()

//   export {app, db, timestamp}
//   export const auth = getAuth(app);

  
// export const AuthContext = createContext()

// export const AuthContextProvider = props => {
//   const [user, setUser] = useState()
//   const [error, setError] = useState()

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
//     return () => unsubscribe()
//   }, [])
//   return <AuthContext.Provider value={{ user, error }} {...props} />
// }

// export const useAuthState = () => {
//   const auth = useContext(AuthContext)
//   return { ...auth, isAuthenticated: auth.user != null }
// }



// import { initializeApp } from 'firebase/app';
// import { getFirestore, serverTimestamp } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { useState, useEffect, useContext, createContext } from 'react';

// const firebaseConfig = {
//     apiKey: "AIzaSyBQ1LfqgYACVj-L65YoKemiyiwX8y_-5N0",
//     authDomain: "kanban-board-b1f67.firebaseapp.com",
//     projectId: "kanban-board-b1f67",
//     storageBucket: "kanban-board-b1f67.appspot.com",
//     messagingSenderId: "335402454931",
//     appId: "1:335402454931:web:bac683c893b1054e91a266"
//   };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const timestamp = serverTimestamp();
// const auth = getAuth(app);
// const database = getDatabase(app);

// export { app, db, timestamp, auth, database };

// export const AuthContext = createContext();
// export const DatabaseContext = createContext();

// export const AuthContextProvider = (props) => {
//   const [user, setUser] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, setUser, setError);
//     return () => unsubscribe();
//   }, []);

//   return <AuthContext.Provider value={{ user, error }} {...props} />;
// };

// export const DatabaseContextProvider = (props) => {
//   return <DatabaseContext.Provider value={database} {...props} />;
// };

// export const useAuthState = () => {
//   const auth = useContext(AuthContext);
//   return { ...auth, isAuthenticated: auth.user != null };
// };

// export const useDatabase = () => {
//   return useContext(DatabaseContext);
// };


















import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, useContext, createContext } from 'react';

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













// import { initializeApp } from 'firebase/app';
// import { getFirestore, serverTimestamp, collection, doc, setDoc, getDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
// import { useState, useEffect, useContext, createContext } from 'react';

// const firebaseConfig = {
//     // Your Firebase config here
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const timestamp = serverTimestamp();
// const auth = getAuth(app);

// export { app, db, timestamp, auth };

// export const AuthContext = createContext();
// export const DatabaseContext = createContext();

// export const AuthContextProvider = (props) => {
//   const [user, setUser] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setUser(user);

//       // Create a new document for the user in the 'users' collection if they're authenticated
//       if (user) {
//         const userId = user.uid;
//         const userRef = doc(collection(db, 'users'), userId);

//         try {
//           // Check if the document already exists
//           const userDoc = await getDoc(userRef);
//           if (!userDoc.exists()) {
//             // If it doesn't exist, create it
//             await setDoc(userRef, {});
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     }, setError);

//     return () => unsubscribe();
//   }, []);

//   const createUser = async (email, password) => {
//     try {
//       const { user } = await createUserWithEmailAndPassword(auth, email, password);
//       const userId = user.uid;
//       const userRef = doc(collection(db, 'users'), userId);
//       await setDoc(userRef, {});

//       return user;
//     } catch (error) {
//       setError(error);
//       return null;
//     }
//   };

//   const signIn = async (email, password) => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, email, password);
//       return user;
//     } catch (error) {
//       setError(error);
//       return null;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       setError(error);
//     }
//   };

//   return <AuthContext.Provider value={{ user, error, createUser, signIn, logout }} {...props} />;
// };

// export const DatabaseContextProvider = (props) => {
//   return <DatabaseContext.Provider value={db} {...props} />;
// };

// export const useAuthState = () => {
//   const auth = useContext(AuthContext);
//   return { ...auth, isAuthenticated: auth.user != null };
// };

// export const useDatabase = () => {
//   return useContext(DatabaseContext);
// };
