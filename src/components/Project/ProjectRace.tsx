import { css } from '@emotion/react';
import { githubUsers } from '@/types/GitHubApiType';
import { useEffect, useState } from 'react';
import { ShowUserType } from '@/types/ShowUserType';
import { useGithubUsers } from '@/hooks/useGithubUsers';
import { getShowUsersHandler } from '@/lib/firebase/getShowUsersHandler';

const styles = {
  container: css`
    width: 90%;
    margin: 0 auto;
    background-color: rgb(237, 241, 245);
  `,
};

type Props = {
  projectId: string;
  isPublic?: boolean;
};

const ProjectRace = ({ projectId, isPublic }: Props) => {
  const [githubUserList, setGitHubUserList] =
    useState<githubUsers>([]);
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
  }, []);

  useEffect(() => {
    const asyncData = async () => {
      setGitHubUserList(
        await useGithubUsers(fetchShowUsers)
      );
    };
    asyncData();
  }, [fetchShowUsers]);

  if (!githubUserList.length) return <div>loading...</div>;

  return (
    <div css={styles.container}>
     
    </div>
  );
};

export default ProjectRace;
