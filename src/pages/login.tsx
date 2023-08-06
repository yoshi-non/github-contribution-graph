import { auth } from '@/lib/firebaseClient';
import {
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import React from 'react';

const LoginPage = () => {
  const login = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential =
          GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential =
          GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login()}>ログイン</button>
    </div>
  );
};

export default LoginPage;
