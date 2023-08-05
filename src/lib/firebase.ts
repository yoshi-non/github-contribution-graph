// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const firebaseSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential =
        GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
    })
    .catch((error) => {});
};

export const firebaseSignOut = () => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
