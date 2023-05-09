import { useContributions } from '@/hooks/useContributions';
import {
  chartContributionDateDuringState,
  chartDatasetState,
  chartUserContributionListState,
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
  // 全ユーザーのコントリビューションのリスト
  const [contributionList, setContributionList] =
    useRecoilState(contributionListState);

  // チャートに使用する日付の配列
  const [
    chartContributionDateDuring,
    setChartContributionDateDuring,
  ] = useRecoilState(chartContributionDateDuringState);

  // チャートに使用するユーザー毎のコントリビューション数(1週間毎)の配列
  const [
    chartUserContributionList,
    setChartUserContributionList,
  ] = useRecoilState(chartUserContributionListState);

  // データセット
  const [chartDataset, setChartDataset] = useRecoilState(
    chartDatasetState
  );

  const getData = () => {
    // 各ユーザーのコントリビューションを取得
    const { getContributions } = useContributions();
    githubUserList.map(async (user) => {
      const GITHUB_USER = user.id;
      const data = await getContributions(GITHUB_USER);
      setContributionList((old) => [...old, data]);
    });
  };
  console.log(contributionList);

  // const makeChartDataset = () => {
  //   // チャートに使用するデータを整形して配列に格納
  //   const dateDuring =
  //     contributionList[0]?.user.contributionsCollection.contributionCalendar.weeks.map(
  //       (week) => {
  //         return `${week.contributionDays[0].date} ~ ${
  //           week.contributionDays[
  //             week.contributionDays.length - 1
  //           ].date
  //         }`;
  //       }
  //     );
  //   setChartContributionDateDuring(dateDuring);

  //   // contributionListの要素が未定義の場合は何もしない
  //   if (!contributionList[0]?.user) {
  //     return;
  //   }

  //   // チャートに使用するデータを整形して配列に格納
  //   const chartData = githubUserList.map((user, i) => {
  //     const userContribution = contributionList[
  //       i
  //     ]?.user.contributionsCollection.contributionCalendar.weeks.map(
  //       (week) => {
  //         return week.contributionDays.reduce(
  //           (total, day) => total + day.contributionCount,
  //           0
  //         );
  //       }
  //     );
  //     return {
  //       label: user.name,
  //       data: userContribution,
  //       borderColor: `rgb(${i * 30}, ${i * 30}, ${i * 20})`,
  //       backgroundColor: `rgba(${i * 30}, ${i * 30}, ${
  //         i * 20
  //       }, 0.5)`,
  //     };
  //   });
  //   setChartDataset(chartData);
  // };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   makeChartDataset();
  // }, [contributionList]);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'GitHub Contribution',
  //     },
  //   },
  // };

  // const graphData = {
  //   labels: chartContributionDateDuring,
  //   datasets: chartDataset,
  // };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
          {/* <Line data={graphData} options={options} /> */}
        </div>
        <div>
          {githubUserList.map((user, index) => (
            <div key={index}>
              {user.name}:
              {
                contributionList[index]?.user
                  .contributionsCollection
                  .contributionCalendar.totalContributions
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
