import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6Brw4gzFLwWTnFf5nQCWkltgB_4mJyMU",
  authDomain: "school-system-live-b2889.firebaseapp.com",
  projectId: "school-system-live-b2889",
  storageBucket: "school-system-live-b2889.firebasestorage.app",
  messagingSenderId: "554845665554",
  appId: "1:554845665554:web:7f79b2f12de11ccad05bcb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

