import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// 🔥 This MUST match your NEW project (school-system-live-b2889)
const firebaseConfig = {
  apiKey: "AIzaSyC6Brw4gzFLwWTnFf5nQCWkltgB_4mJyMU",  // Check this in your new project
  authDomain: "school-system-live-b2889.firebaseapp.com",
  projectId: "school-system-live-b2889",
  storageBucket: "school-system-live-b2889.appspot.com",
  messagingSenderId: "56201683459",
  appId: "1:56201683459:web:03910a532e2bdb7b36436"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
