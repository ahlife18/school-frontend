import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAnnXly-yczloOlBF9xQpYYx8Unk_Sco6Y",
  authDomain: "smsp-7948b.firebaseapp.com",
  projectId: "smsp-7948b",
  storageBucket: "smsp-7948b.firebasestorage.app",
  messagingSenderId: "56201683459",
  appId: "1:56201683459:web:03910a532e2bdb7b36436"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);