import { datasetState, githubUsers } from '@/store/atoms';
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
import { Grid } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useDatasets } from '@/hooks/useDatasets';
import { useGithubUsers } from '@/hooks/useGithubUsers';
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

export default function Old() {
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
    };
    asyncData();
  }, []);

  useEffect(() => {
    console.log(githubUserList);
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
    <div>
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
        <Grid
          className={styles.userList}
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {githubUserList?.map((user, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              {user.avatarUrl && user.name && (
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
                    <div
                      className={styles.userWrapperRight}
                    >
                      <p className={styles.userName}>
                        {user.name}
                      </p>
                      <p className={styles.userId}>
                        {user.id}
                      </p>
                      <p
                        className={styles.userContribution}
                      >
                        {user.allContributions}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
