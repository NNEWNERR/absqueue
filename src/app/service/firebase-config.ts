import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Add your Firebase project configuration here
  projectId: 'absdata-46619',
  appId: '1:252976268944:web:499a9a76198c76ddce7a15',
  storageBucket: 'absdata-46619.appspot.com',
  apiKey: 'AIzaSyDvnnMp0ixuQbTg27nFqa8z_BgZQQXVLXk',
  authDomain: 'absdata-46619.firebaseapp.com',
  messagingSenderId: '252976268944',
};
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
