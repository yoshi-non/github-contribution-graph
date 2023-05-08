import { useContributions } from '@/hooks/useContributions';
import {
  chartContributionDateDuringState,
  chartUserContributionState,
  contributionListState,
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
  const GITHUB_USER = githubUserList[0].id;
  const [contributionList, setContributionList] =
    useRecoilState(contributionListState);
  const [
    chartContributionDateDuring,
    setChartContributionDateDuring,
  ] = useRecoilState(chartContributionDateDuringState);
  const [chartUserContribution, setChartUserContribution] =
    useRecoilState(chartUserContributionState);

  const getData = async () => {
    const { getContributions } = useContributions();
    const data = await getContributions(GITHUB_USER);
    setContributionList(data);
  };
  console.log(contributionList.user);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const dateDuring =
      contributionList.user.contributionsCollection.contributionCalendar.weeks.map(
        (week) => {
          return `${week.contributionDays[0].date} ~ ${
            week.contributionDays[
              week.contributionDays.length - 1
            ].date
          }`;
        }
      );
    setChartContributionDateDuring(dateDuring);

    const userContribution =
      contributionList.user.contributionsCollection.contributionCalendar.weeks.map(
        (week) => {
          return week.contributionDays.reduce(
            (total, day) => total + day.contributionCount,
            0
          );
        }
      );

    setChartUserContribution(userContribution);
  }, [contributionList.user]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'グラフタイトル',
      },
    },
  };

  const graphData = {
    labels: chartContributionDateDuring,
    datasets: [
      {
        label: githubUserList[0].name,
        data: chartUserContribution,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
          <Line data={graphData} options={options} />
          {/* <div>
            <p>
              年間コントリビューション数:
              {
                contributionList.user
                  .contributionsCollection
                  .contributionCalendar.totalContributions
              }
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
