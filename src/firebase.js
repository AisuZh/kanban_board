import {initializeApp} from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBQ1LfqgYACVj-L65YoKemiyiwX8y_-5N0",
    authDomain: "kanban-board-b1f67.firebaseapp.com",
    projectId: "kanban-board-b1f67",
    storageBucket: "kanban-board-b1f67.appspot.com",
    messagingSenderId: "335402454931",
    appId: "1:335402454931:web:bac683c893b1054e91a266"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const timestamp = serverTimestamp()

  export {app, db, timestamp}
  export const auth = getAuth(app);
