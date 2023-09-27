import DeleteProjectCard from '@/components/Project/Setting/DeleteProjectCard';
import ProjectGraphCard from '@/components/ProjectGraphCard';
import ProjectNavbar from '@/components/ProjectNavbar';
import ProjectShowUsersCard from '@/components/ProjectShowUsersCard';
import Sidebar from '@/components/Sidebar';
import SidebarTitle from '@/components/Sidebar/SidebarTitle';
import Topbar from '@/components/Topbar';
import { useAuth } from '@/context/auth';
import { useGithubUsers } from '@/hooks/useGithubUsers';
import { getShowUsersHandler } from '@/lib/firebase/getShowUsersHandler';
import { db } from '@/lib/firebaseClient';
import { githubUsers } from '@/store/atoms';
import { fetchProjectState } from '@/store/fetchProjectAtoms';
import { memberCountState } from '@/store/memberCountAtoms';
import { projectSelectViewState } from '@/store/projectSelectViewAtoms';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import { NonIdProjectType } from '@/types/ProjectType';
import { ShowUserType } from '@/types/ShowUserType';
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
  const [isOpenSidebar, setIsOpenSidebar] = useRecoilState(
    isOpenSidebarState
  );

  const { fbUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !fbUser) {
      router.push('/');
    }
  }, [fbUser, isLoading, router]);
  const { id } = router.query;
  const projectId = id as string | undefined;
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [fetchShowUsers, setFetchShowUsers] = useState<
    ShowUserType[]
  >([]);

  const [githubUserList, setGitHubUserList] =
    useState<githubUsers>([]);

  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);

  const [projectSelectView, setProjectSelectView] =
    useRecoilState(projectSelectViewState);

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

  useEffect(() => {
    const fetchShowUsersAsync = async () => {
      try {
        if (!projectId) return;
        const results = await getShowUsersHandler(
          projectId
        );
        if (!results) return;
        setFetchShowUsers(results);
      } catch (error) {
        console.log('Error fetching projects:', error);
      }
    };
    fetchShowUsersAsync();
  }, [setFetchProject, memberCount]);

  useEffect(() => {
    const asyncData = async () => {
      setGitHubUserList(
        await useGithubUsers(fetchShowUsers)
      );
    };
    asyncData();
  }, [fetchShowUsers]);

  if (
    !fbUser ||
    isLoading ||
    typeof projectId !== 'string'
  ) {
    return null;
  }

  return (
    <div css={styles.container}>
      <div css={styles.topContent}>
        <SidebarTitle />
        <Topbar crrPath={fetchProject?.name} />
      </div>
      <div css={styles.mainWrapper}>
        {isOpenSidebar && <Sidebar />}
        <div css={styles.projectWrapper}>
          <ProjectNavbar ownerId={fetchProject?.ownerId} />
          {projectSelectView === 'graph' && (
            <div>
              <ProjectGraphCard
                githubUserList={githubUserList}
              />
              <ProjectShowUsersCard
                fetchShowUsers={fetchShowUsers}
                setFetchShowUsers={setFetchShowUsers}
                githubUserList={githubUserList}
              />
            </div>
          )}
          {projectSelectView === 'setting' && (
            <div>
              <DeleteProjectCard projectId={projectId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
