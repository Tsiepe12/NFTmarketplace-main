import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLRMsedIzzwrePZzrAPeH92U0fyzGLQSU",
  authDomain: "nftmarketplace-f0ab9.firebaseapp.com",
  projectId: "nftmarketplace-f0ab9",
  storageBucket: "nftmarketplace-f0ab9.firebasestorage.app",
  messagingSenderId: "159285645904",
  appId: "1:159285645904:web:4afb11141aa308c7c57755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;