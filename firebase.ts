import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCujByEbZvvsUpTWZNKGx2EWSNfHw5XZpU',
  authDomain: 'watches-74739.firebaseapp.com',
  projectId: 'watches-74739',
  storageBucket: 'watches-74739.appspot.com',
  messagingSenderId: '1037568675246',
  appId: '1:1037568675246:web:46f45d420e50ef54b9cc3f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

export { db };
