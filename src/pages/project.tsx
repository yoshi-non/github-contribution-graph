import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

const styles = {
  container: css`
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: rgb(237, 241, 245);
  `,
  mainWrapper: css`
    width: 100%;
  `,
};

const Project = () => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  return (
    <div css={styles.container}>
      <Sidebar />
      <div css={styles.mainWrapper}>
        <Topbar />
      </div>
    </div>
  );
};

export default Project;
