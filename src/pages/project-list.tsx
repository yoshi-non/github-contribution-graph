import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/auth';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const styles = {
  container: css``,
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
    </div>
  );
};

export default ProjectList;
