import { useContributions } from '@/hooks/useContributions';
import {
  ResponseData,
  chartContributionDateDuringState,
  chartDatasetState,
  contributionListState,
  dataset,
  gitHubUserListState,
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
import { defaultGithubUserList } from '@/githubUserList';
import AspectRatio from '@mui/joy/AspectRatio';
import { CssVarsProvider } from '@mui/joy/styles';
import { Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

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

  // GitHubユーザーのリスト
  const [githubUserList, setGitHubUserList] =
    useRecoilState(gitHubUserListState);

  const getGithubUserList = async () => {
    let newGithubUserList = [...githubUserList];
    const promiseGithubUser = defaultGithubUserList.map(
      async (user) => {
        const response = await fetch(
          `https://api.github.com/users/${user.id}`
        );
        return await response.json();
      }
    );
    const data = await Promise.all(promiseGithubUser);
    return data.map((user, index) => {
      return {
        ...newGithubUserList[index],
        name: user.name === null ? user.login : user.name,
        avatarUrl: user.avatar_url,
      };
    });
  };

  const getData = async () => {
    const { getContributions } = useContributions();
    const promiseContributions = githubUserList.map(
      (user) => getContributions(user.id)
    );
    const data = await Promise.all(promiseContributions);
    return data as ResponseData;
  };

  const getCompleteGitHubUserList = async () => {
    const users = getGithubUserList();
    let newGithubUserList2 = [...(await users)];
    contributionList.forEach((value, index) => {
      newGithubUserList2[index] = {
        ...newGithubUserList2[index],
        allContributions:
          value.user.contributionsCollection
            .contributionCalendar.totalContributions,
      };
    });
    setGitHubUserList(newGithubUserList2);
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

  const [
    contributionListLoaded,
    setContributionListLoaded,
  ] = useState(false);

  useEffect(() => {
    async function getDataAsync() {
      const newContributionList = await getData();
      setContributionList(newContributionList);
      setContributionListLoaded(true); // 状態を更新
    }
    getDataAsync();
  }, []);

  useEffect(() => {
    if (contributionListLoaded) {
      getCompleteGitHubUserList();
      makeChartDataset();
    }
  }, [contributionListLoaded]);

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
        <Grid
          className={styles.userList}
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {githubUserList.map((user, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Link
                href={`https://github.com/${user.id}`}
                target="_blank"
              >
                <div className={styles.userWrapper}>
                  <div className={styles.userWrapperLeft}>
                    <Image
                      className={styles.userIcon}
                      src={user.avatarUrl}
                      alt={user.name}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styles.userWrapperRight}>
                    <p className={styles.userName}>
                      {user.name}
                    </p>
                    <p className={styles.userId}>
                      {user.id}
                    </p>
                    <p className={styles.userContribution}>
                      {user.allContributions}
                    </p>
                  </div>
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
