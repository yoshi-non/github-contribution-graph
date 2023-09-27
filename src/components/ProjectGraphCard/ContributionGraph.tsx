import { dataset, githubUsers } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  githubUserList: githubUsers;
};

const ContributionGraph = ({ githubUserList }: Props) => {
  // データセット
  const [datasets, setDatasets] = useState<dataset>([]);

  useEffect(() => {
    if (githubUserList.length > 0) {
      setDatasets(useDatasets(githubUserList));
    }
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
