import { auth } from '@/lib/firebaseClient';
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React from 'react';

const LoginPage = () => {
  const login = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      alert('ログインしました');
      console.log(result.user);
    });
  };
  const logout = () => {
    signOut(auth).then(() => {
      alert('ログアウトしました');
    });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login()}>ログイン</button>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};

export default LoginPage;
