import CreateProjectBox from '@/components/CreateProjectBox';
import ProjectBox from '@/components/ProjectBox';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getProjectHandler } from '@/lib/firebase/getProjectHandler';
import { ProjectType } from '@/types/ProjectType';
import { fetchProjectsState } from '@/store/fetchProjectAtoms';
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

const ProjectList = () => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();
  const [fetchProjects, setFetchProjects] = useRecoilState<
    ProjectType[]
  >(fetchProjectsState);

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);

  useEffect(() => {
    if (fbUser) {
      const fetchProjectsAsync = async () => {
        try {
          const results = await getProjectHandler(
            fbUser.uid
          );
          if (results) {
            setFetchProjects(results);
          }
        } catch (error) {
          console.log('Error fetching projects:', error);
        }
      };
      fetchProjectsAsync();
    }
  }, [fbUser]);

  return (
    <div css={styles.container}>
      <Sidebar />
      <div css={styles.mainWrapper}>
        <Topbar />
        <CreateProjectBox />
        <ProjectBox />
      </div>
    </div>
  );
};

export default ProjectList;
