import { useContributions } from '@/hooks/useContributions';
import {
  chartContributionDateDuringState,
  chartDatasetState,
  contributionListState,
  dataset,
} from '@/store/atoms';
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
import { githubUserList } from '@/githubUserList';
import AspectRatio from '@mui/joy/AspectRatio';
import { CssVarsProvider } from '@mui/joy/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  // 全ユーザーのコントリビューションのリスト
  const [contributionList, setContributionList] =
    useRecoilState(contributionListState);

  // チャートに使用する日付の配列
  const [
    chartContributionDateDuring,
    setChartContributionDateDuring,
  ] = useRecoilState(chartContributionDateDuringState);

  // データセット
  const [chartDataset, setChartDataset] = useRecoilState(
    chartDatasetState
  );

  const getData = async () => {
    try {
      const { getContributions } = useContributions();
      const promises = githubUserList.map((user) =>
        getContributions(user.id)
      );
      const data = await Promise.all(promises);
      setContributionList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const makeChartDataset = () => {
    // チャートに使用するデータを整形して配列に格納
    const dateDuring =
      contributionList[0]?.user.contributionsCollection.contributionCalendar.weeks.map(
        (week) => {
          return `${week.contributionDays[0].date} ~ ${
            week.contributionDays[
              week.contributionDays.length - 1
            ].date
          }`;
        }
      );
    setChartContributionDateDuring(dateDuring);

    // チャートに使用するデータを整形して配列に格納
    const chartData: dataset = githubUserList.map(
      (user, i) => {
        const userContribution = contributionList[
          i
        ]?.user.contributionsCollection.contributionCalendar.weeks.map(
          (week) => {
            return week.contributionDays.reduce(
              (total, day) => total + day.contributionCount,
              0
            );
          }
        );
        return {
          label: user.name,
          data: userContribution,
          borderColor: `${user.color}`,
          backgroundColor: `#ffffffff`,
        };
      }
    );
    setChartDataset(chartData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    makeChartDataset();
  }, [contributionList]);

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
    labels: chartContributionDateDuring,
    datasets: chartDataset,
  };

  return (
    <div>
      <div className={styles.container}>
        <CssVarsProvider>
          <AspectRatio
            component="div"
            variant="plain"
            ratio="2/1"
          >
            <Line data={graphData} options={options} />
          </AspectRatio>
        </CssVarsProvider>
        <div>
          {githubUserList.map((user, index) => (
            <div key={index}>
              {user.name}:
              {contributionList &&
                contributionList[index] &&
                contributionList[index].user
                  .contributionsCollection
                  .contributionCalendar.totalContributions}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
