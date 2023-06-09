import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await addUserToCollection(user);
    return user;
  };

  const signIn = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await addUserToCollection(user);
    return user;
  };

  const logout = () => {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const addUserToCollection = async (user) => {
    const { uid, email } = user;
    const usersCollectionRef = collection(db, 'users');
    const userDocRef = doc(usersCollectionRef, uid);
    await setDoc(userDocRef, { email });

    const userListsCollectionRef = collection(db, 'users', uid, 'lists');
    await setDoc(doc(userListsCollectionRef, 'default'), { board: [] });
  };

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
