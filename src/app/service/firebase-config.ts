import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Import the Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Add your Firebase project configuration here
  projectId: 'absdata-46619',
  appId: '1:252976268944:web:499a9a76198c76ddce7a15',
  storageBucket: 'absdata-46619.appspot.com',
  apiKey: 'AIzaSyDvnnMp0ixuQbTg27nFqa8z_BgZQQXVLXk',
  authDomain: 'absdata-46619.firebaseapp.com',
  messagingSenderId: '252976268944',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
