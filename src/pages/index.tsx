import { useContributions } from '@/hooks/useContributions';
import styles from '@/styles/Home.module.css';
import { useRecoilState } from 'recoil';

export default function Home() {
  const getData = () => {
    const { getContributions } = useContributions();
    const contributions = getContributions('yoshi-non');
    console.log(contributions);
  };
  return (
    <div>
      <button onClick={() => getData()}>取得</button>
    </div>
  );
}
