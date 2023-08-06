import { useAuth } from '@/context/auth';
import { login, logout } from '@/lib/auth';
import { useRouter } from 'next/router';
import React from 'react';

const LoginPage = () => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();
  // ログインしていなければルートディレクトリに飛ばす処理
  //   if (isLoading) {
  //     return null;
  //   }

  //   if (!fbUser) {
  //     router.push('/');
  //     return null;
  //   }

  console.log(fbUser);
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => login()}>ログイン</button>
      <button onClick={() => logout()}>ログアウト</button>
    </div>
  );
};

export default LoginPage;
