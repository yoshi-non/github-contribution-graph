import {
  datasetState,
  contributionDateDuringState,
  githubUsers,
} from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AspectRatio from '@mui/joy/AspectRatio';
import { CssVarsProvider } from '@mui/joy/styles';
import { useDatasets } from '@/hooks/useDatasets';
import { useGithubUsers } from '@/hooks/useGithubUsers';
import { useDateDuring } from '@/hooks/useDateDuring';
import { defaultGithubUsers } from '@/githubUsers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ContributionGraph = () => {
  const [
    contributionDateDuring,
    setContributionDateDuring,
  ] = useRecoilState(contributionDateDuringState);

  // データセット
  const [datasets, setDatasets] =
    useRecoilState(datasetState);

  // GitHubユーザーのリスト
  const [githubUserList, setGitHubUserList] =
    useState<githubUsers>([]);

  const showUsers = defaultGithubUsers;

  useEffect(() => {
    const asyncData = async () => {
      const fetchGithubUsers = (await useGithubUsers(
        showUsers
      )) as githubUsers;
      setGitHubUserList(fetchGithubUsers);
      setDatasets(useDatasets(fetchGithubUsers));
      setContributionDateDuring(await useDateDuring());
    };
    asyncData();
  }, []);

  const options = {
    responsive: true,
    aspectRatio: 2,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'GitHub Contribution',
      },
    },
  };

  const graphData = {
    labels: contributionDateDuring,
    datasets: datasets,
  };
  return (
    <div className={styles.container}>
      {/* グラフ */}
      <CssVarsProvider>
        <AspectRatio
          component="div"
          variant="plain"
          ratio="2/1"
        >
          <Line data={graphData} options={options} />
        </AspectRatio>
      </CssVarsProvider>
    </div>
  );
};

export default ContributionGraph;
