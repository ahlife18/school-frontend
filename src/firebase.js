import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnnXly-yczloOlBF9xQpYYx8Unk_Sco6Y",
  authDomain: "smsp-7948b.firebaseapp.com",
  projectId: "smsp-7948b",
  storageBucket: "smsp-7948b.firebasestorage.app",
  messagingSenderId: "56201683459",
  appId: "1:56201683459:web:03910a532e2bdbb7b36436",
  measurementId: "G-D8RY9GGSFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth object (THIS IS THE CRITICAL LINE)
export const auth = getAuth(app);