import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCWmRlFp4PpmPabM2maU58bB47pWG1NM5U",
  authDomain: "ayurveda-4dc59.firebaseapp.com",
  projectId: "ayurveda-4dc59",
  storageBucket: "ayurveda-4dc59.firebasestorage.app",
  messagingSenderId: "526684345169",
  appId: "1:526684345169:web:a6accc22e39aa88018f970",
  measurementId: "G-5RQ0H1TCR6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;