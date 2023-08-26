import { useAuth } from '@/context/auth';
import { login, logout } from '@/lib/auth';
import Link from 'next/link';

export default function Home() {
  const { fbUser, isLoading } = useAuth();

  return (
    <div>
      <div>
        {fbUser ? (
          <button onClick={logout}>ログアウト</button>
        ) : (
          <button onClick={login}>ログイン</button>
        )}
      </div>
      <p>
        ※以前の仕様を変更しているため以前までのページは移動しました。
        <br />
        現在データを書き換えいるため、以前のユーザーの表示を減らしています。
      </p>
      <Link href="/old">以前のページはこちら</Link>
    </div>
  );
}
