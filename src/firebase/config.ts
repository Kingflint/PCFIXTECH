import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCSZdt68xfFJFYRfo8pY-fliYpQijnOKwE",
  authDomain: "hair-paradise.firebaseapp.com",
  projectId: "hair-paradise",
  storageBucket: "hair-paradise.firebasestorage.app",
  messagingSenderId: "522101193733",
  appId: "1:522101193733:web:5a56cbd46c1dc4ab0e306c",
  measurementId: "G-H5ZFNYKPM0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
