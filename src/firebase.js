import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 🔥 REPLACE THIS WITH THE EXACT CONFIG FROM YOUR FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSyANnXIy-yczLOlBF9xOs-netc",
  authDomain: "school-frontend-puce-three.firebaseapp.com",
  projectId: "school-frontend-puce-three",
  storageBucket: "school-frontend-puce-three.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);