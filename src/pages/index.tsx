import { useContributions } from '@/hooks/useContributions';
import { contributionListState } from '@/store/atoms';
import styles from '@/styles/Home.module.css';
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

  return (
    <div>
      <button onClick={() => getData()}>取得</button>
      <div className={styles.container}>
        <div>
          <h3>yoshi-non</h3>
          <div>
            {
              contributionList.user.contributionsCollection
                .contributionCalendar.totalContributions
            }
          </div>
        </div>
      </div>
    </div>
  );
}
