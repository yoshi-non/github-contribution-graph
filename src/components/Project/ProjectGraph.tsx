import { ShowUserType } from '@/types/ShowUserType';
import { useEffect, useState } from 'react';
import ProjectGraphCard from '../ProjectGraphCard';
import ProjectShowUsersCard from '../ProjectShowUsersCard';
import { useGithubUsers } from '@/hooks/useGithubUsers';
import { githubUsers } from '@/types/GitHubApiType';
import { useRecoilState } from 'recoil';
import { memberCountState } from '@/store/memberCountAtoms';
import { getShowUsersHandler } from '@/lib/firebase/getShowUsersHandler';
import { fetchProjectState } from '@/store/fetchProjectAtoms';

type Props = {
  projectId: string;
  isPublic?: boolean;
};

const ProjectGraph = ({ projectId, isPublic }: Props) => {
  const [githubUserList, setGitHubUserList] =
    useState<githubUsers>([]);
  const [memberCount, setMemberCount] =
    useRecoilState<number>(memberCountState);
  const [fetchProject, setFetchProject] = useRecoilState(
    fetchProjectState
  );
  const [fetchShowUsers, setFetchShowUsers] = useState<
    ShowUserType[]
  >([]);

  useEffect(() => {
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
  }, [projectId, setFetchProject, memberCount]);

  useEffect(() => {
    const asyncData = async () => {
      setGitHubUserList(
        await useGithubUsers(fetchShowUsers)
      );
    };
    asyncData();
  }, [fetchShowUsers]);
  return (
    <div>
      <ProjectGraphCard githubUserList={githubUserList} />
      <ProjectShowUsersCard
        fetchShowUsers={fetchShowUsers}
        setFetchShowUsers={setFetchShowUsers}
        githubUserList={githubUserList}
        isPublic={isPublic}
      />
    </div>
  );
};

export default ProjectGraph;
