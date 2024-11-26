import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo-domain",
  projectId: "demo-project",
  storageBucket: "demo-bucket",
  messagingSenderId: "demo-sender",
  appId: "demo-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Demo authentication function
export const signInWithTestCredentials = async () => {
  // Simulate successful auth without actual Firebase
  return {
    user: {
      uid: 'test-user-123',
      email: 'demo@example.com',
      displayName: 'Demo User'
    }
  };
};