// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgFPi1HikAOsWjWTA2m1eHkFsZpicAtBc',
  authDomain: 'github-contribution-graph.firebaseapp.com',
  projectId: 'github-contribution-graph',
  storageBucket: 'github-contribution-graph.appspot.com',
  messagingSenderId: '1091567511390',
  appId: '1:1091567511390:web:9af9d321c7f059492e91cf',
  measurementId: 'G-JSTJ4Q4EWR',
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// export const analytics = getAnalytics();
export const strorage = getStorage();
export const auth = getAuth();
export const db = getFirestore();
