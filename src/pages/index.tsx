import { useAuth } from '@/context/auth';
import { login } from '@/lib/auth';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const styles = {
  container: css`
    max-width: 1000px;
    width: 100%;
    margin: 50px auto;
    padding: 0 20px;
  `,
  titleWrapper: css`
    text-align: center;
    margin-bottom: 50px;
  `,
  main: css`
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 50px;
  `,
  image: css`
    border-radius: 5px;
    flex: 6;
    object-fit: cover;
  `,
  discWrapper: css`
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  `,
  loginButton: css`
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid #333;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background-color: #333;
      color: #fff;
    }
  `,
};

export default function Home() {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (fbUser) {
      router.push('/project-list');
    }
  }, [fbUser, isLoading, router]);

  if (fbUser || isLoading) {
    return null;
  }

  return (
    <div css={styles.container}>
      <div css={styles.titleWrapper}>
        <h1>GitHubの直近1年間のデータ閲覧サイト</h1>
      </div>
      <div css={styles.main}>
        <Image
          src={'/images/main.png'}
          alt={'グラフ'}
          height={380}
          width={480}
          css={styles.image}
        />
        <div css={styles.discWrapper}>
          <p>
            GitHubアカウントでログインすると、直近1年間のデータを閲覧できたり、他のユーザーと比較できたりします。
          </p>
          <button css={styles.loginButton} onClick={login}>
            ログイン
          </button>
        </div>
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
