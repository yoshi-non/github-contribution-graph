import ProjectGraph from '@/components/Project/ProjectGraph';
import ProjectRace from '@/components/Project/ProjectRace';
import ProjectSetting from '@/components/Project/ProjectSetting';
import ProjectNavbar from '@/components/ProjectNavbar';
import Sidebar from '@/components/Sidebar';
import SidebarTitle from '@/components/Sidebar/SidebarTitle';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { db } from '@/lib/firebaseClient';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import { ProjectSelectView } from '@/types/ProjectSelectView';
import { NonIdProjectType } from '@/types/ProjectType';
import { css } from '@emotion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const styles = {
  container: css`
    width: 100%;
    height: 100vh;
    background-color: rgb(237, 241, 245);
  `,
  topContent: css`
    position: sticky;
    z-index: 100;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  `,
  mainWrapper: css`
    width: 100%;
    display: flex;
    height: calc(100vh - 50px);
    overflow: hidden;
  `,
  projectWrapper: css`
    width: 100%;
    overflow-y: scroll;
  `,
};

const Project = () => {
  const { fbUser, isLoading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const projectId = id as string | undefined;

  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  useEffect(() => {
    if (fetchProject?.isPublic === false) {
      if (!isLoading && !fbUser) {
        router.push('/');
      }
    }
  }, [fbUser, isLoading, router]);

  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(
    isOpenSidebarState
  );
  const [projectSelectView, setProjectSelectView] =
    useState<ProjectSelectView>('graph');

  useEffect(() => {
    const getProject = async () => {
      if (!projectId) return;
      const ref = doc(db, `projects/${projectId}`);
      onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setFetchProject(snap.data() as NonIdProjectType);
        }
      });
    };
    getProject();
  }, [projectId, setFetchProject]);

  if (!projectId) return null;

  const isPublic =
    fetchProject?.isPublic === true &&
    fbUser?.uid !== fetchProject.ownerId;

  return (
    <div css={styles.container}>
      <div css={styles.topContent}>
        <SidebarTitle isPublic={isPublic} />
        <Topbar
          crrPath={fetchProject?.name}
          isPublic={isPublic}
        />
      </div>
      <div css={styles.mainWrapper}>
        {isOpenSidebar && <Sidebar isPublic={isPublic} />}
        <div css={styles.projectWrapper}>
          <ProjectNavbar
            projectSelectView={projectSelectView}
            setProjectSelectView={setProjectSelectView}
            ownerId={fetchProject?.ownerId}
          />
          {projectSelectView === 'graph' && (
            <ProjectGraph
              projectId={projectId}
              isPublic={isPublic}
            />
          )}
          {projectSelectView === 'race' && <ProjectRace />}
          {projectSelectView === 'setting' && (
            <ProjectSetting projectId={projectId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
