import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const styles = {
  container: css`
    display: flex;
  `,
  mainWrapper: css`
    width: 100%;
  `,
};

const ProjectList = () => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);

  return (
    <div css={styles.container}>
      <Sidebar />
      <div css={styles.mainWrapper}>
        <Topbar />
      </div>
    </div>
  );
};

export default ProjectList;
