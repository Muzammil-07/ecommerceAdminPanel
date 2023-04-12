import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    
    apiKey:process.env.API_KEY,
  authDomain: "motoapp-93e9c.firebaseapp.com",
  projectId: "motoapp-93e9c",
  storageBucket: "motoapp-93e9c.appspot.com",
  messagingSenderId: "480447870680",
  appId: "1:480447870680:web:591eb196b0935f170189ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);