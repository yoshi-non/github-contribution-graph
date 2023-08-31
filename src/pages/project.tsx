import ProjectGraphCard from '@/components/ProjectGraphCard';
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
import { fetchShowUsersState } from '@/store/fetchShowUsersAtoms';
import { githubUsersState } from '@/store/githubUsersAtom';
import { memberCountState } from '@/store/memberCountAtoms';
import { isOpenSidebarState } from '@/store/sidebarAtoms';
import { NonIdProjectType } from '@/types/ProjectType';
import { css } from '@emotion/react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const styles = {
  container: css`
    width: 100%;
    height: 100vh;
    background-color: rgb(237, 241, 245);
  `,
  topContent: css`
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
  `,
  projectWrapper: css`
    width: 100%;
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
  const projectId = id;
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [fetchShowUsers, setFetchShowUsers] =
    useRecoilState(fetchShowUsersState);

  const [githubUserList, setGitHubUserList] =
    useRecoilState<githubUsers>(githubUsersState);

  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);

  useEffect(() => {
    if (typeof projectId === 'string') {
      setFetchShowUsers([]);
      const ref = doc(db, `projects/${projectId}`);
      const unsubscribe = onSnapshot(ref, (snap) => {
        if (snap.exists()) {
          setFetchProject(snap.data() as NonIdProjectType);
        }
      });
      const fetchShowUsersAsync = async () => {
        try {
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
      return () => {
        unsubscribe();
      };
    }
  }, [projectId, setFetchProject, memberCount]);

  useEffect(() => {
    if (!fetchShowUsers) return;
    const asyncData = async () => {
      const fetchGithubUsers = (await useGithubUsers(
        fetchShowUsers
      )) as githubUsers;
      setGitHubUserList(fetchGithubUsers);
    };
    asyncData();
  }, [fetchShowUsers]);

  return (
    <div css={styles.container}>
      <div css={styles.topContent}>
        <SidebarTitle />
        <Topbar crrPath={fetchProject?.name} />
      </div>
      <div css={styles.mainWrapper}>
        {isOpenSidebar && <Sidebar />}
        <div css={styles.projectWrapper}>
          <ProjectGraphCard />
          <ProjectShowUsersCard />
        </div>
      </div>
    </div>
  );
};

export default Project;
