import { login, logout } from '@/lib/auth';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login()}>ログイン</button>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};

export default LoginPage;
