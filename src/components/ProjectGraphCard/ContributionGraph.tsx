import { datasetState, githubUsers } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';
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
import { githubUsersState } from '@/store/githubUsersAtom';

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
  const [githubUserList, setGitHubUserList] =
    useRecoilState<githubUsers>(githubUsersState);

  // データセット
  const [datasets, setDatasets] =
    useRecoilState(datasetState);

  useEffect(() => {
    const asyncData = async () => {
      if (githubUserList.length === 0) return;
      setDatasets(useDatasets(githubUserList));
    };
    asyncData();
  }, [githubUserList]);

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
    labels: githubUserList[0]?.contributionDateDuring,
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
