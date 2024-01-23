import { css } from '@emotion/react';
import { githubUsers } from '@/types/GitHubApiType';
import { useEffect, useRef, useState } from 'react';
import { ShowUserType } from '@/types/ShowUserType';
import { useGithubUsers } from '@/hooks/useGithubUsers';
import { getShowUsersHandler } from '@/lib/firebase/getShowUsersHandler';
import useInterval from '../../hooks/race/useInterval';
import RacingBarChart from './Race/RacingBarChart';

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

  // useEffect(() => {
  //   const fetchShowUsersAsync = async () => {
  //     try {
  //       const results = await getShowUsersHandler(
  //         projectId
  //       );
  //       if (!results) return;
  //       setFetchShowUsers(results);
  //     } catch (error) {
  //       console.log('Error fetching projects:', error);
  //     }
  //   };
  //   fetchShowUsersAsync();
  // }, []);

  // useEffect(() => {
  //   const asyncData = async () => {
  //     setGitHubUserList(
  //       await useGithubUsers(fetchShowUsers)
  //     );
  //   };
  //   asyncData();
  // }, [fetchShowUsers]);

  // if (!githubUserList.length) return <div>loading...</div>;

 type DataType = {
    name: string;
    value: number;
    color: string;
  }[];

  const getRandomIndex = (array: DataType) => {
    return Math.floor(array.length * Math.random());
  };

  const videoRef = useRef();
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState<DataType>([
    {
      name: 'A',
      value: 10,
      color: '#f00',
    },
    {
      name: 'B',
      value: 20,
      color: '#0f0',
    },
    {
      name: 'C',
      value: 30,
      color: '#00f',
    },
  ]);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10,
              }
            : entry
        )
      );
      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <div css={styles.container}>
      <RacingBarChart data={data} />
      <button onClick={() => setStart(!start)}>
        {start ? 'Stop the race' : 'Start the race!'}
      </button>
      <p>Iteration: {iteration}</p>
    </div>
  );
};

export default ProjectRace;
