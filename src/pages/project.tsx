import ProjectGraphCard from '@/components/ProjectGraphCard';
import ProjectShowUsersCard from '@/components/ProjectShowUsersCard';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { db } from '@/lib/firebaseClient';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { NonIdProjectType } from '@/types/ProjectType';
import { css } from '@emotion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

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

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);

  const { id } = router.query;
  const projectId = id;
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );

  useEffect(() => {
    if (projectId) {
      const ref = doc(db, `projects/${projectId}`);
      const unsubscribe = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setFetchProject(snap.data() as NonIdProjectType);
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [projectId, setFetchProject]);

  return (
    <div css={styles.container}>
      <Sidebar />
      <div css={styles.mainWrapper}>
        <Topbar crrPath={fetchProject?.name} />
        <ProjectGraphCard />
        <ProjectShowUsersCard />
      </div>
    </div>
  );
};

export default Project;
