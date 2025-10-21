import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  "projectId": "studio-4279912915-71054",
  "appId": "1:49115901875:web:3e13b3b2e00ca5a00d25c6",
  "apiKey": "AIzaSyDbMmEMeo_R7FBJ4yinDjH7pyOD1grK25s",
  "authDomain": "studio-4279912915-71054.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "49115901875"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
