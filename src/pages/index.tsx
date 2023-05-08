import { useContributions } from '@/hooks/useContributions';
import { contributionListState } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function Home() {
  const GITHUB_USER = 'yoshi-non';
  const [contributionList, setContributionList] =
    useRecoilState(contributionListState);

  const getData = async () => {
    const { getContributions } = useContributions();
    const data = await getContributions(GITHUB_USER);
    setContributionList(data);
  };
  console.log(contributionList.user);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h3>yoshi-non</h3>
          <div>
            <p>
              年間コントリビューション数:
              {
                contributionList.user
                  .contributionsCollection
                  .contributionCalendar.totalContributions
              }
            </p>
            {contributionList.user.contributionsCollection.contributionCalendar.weeks.map(
              (week, index) => {
                return (
                  <p key={index}>
                    スタート日:
                    {week.contributionDays[0].date}
                    <br />
                    {week.contributionDays.reduce(
                      (total, day) =>
                        total + day.contributionCount,
                      0
                    )}
                  </p>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
