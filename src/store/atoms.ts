import { defaultGithubUserList } from '@/githubUserList';
import { atom } from 'recoil';

export type ResponseData = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
          }[];
        }[];
      };
    };
  };
}[];

export type githubUserList = {
  id: string;
  name: string;
  avatarUrl: string;
  allContributions: number;
  color: string;
}[];

export const gitHubUserListState = atom<githubUserList>({
  key: 'gitHubUserListState',
  default: defaultGithubUserList,
});

export const contributionListState = atom<ResponseData>({
  key: 'contributionListState',
  default: [],
});

// コントリビューションの一週間のはじまりとおわりの日付
export const chartContributionDateDuringState = atom<
  string[]
>({
  key: 'chartContributionDateDuringState',
  default: [],
});

export const chartUserContributionListState = atom<
  number[]
>({
  key: 'chartUserContributionListState',
  default: [],
});

export type dataset = {
  label: string;
  data: (number | undefined)[];
  borderColor: string;
  backgroundColor: string;
}[];

// グラフに渡すデータセット
export const chartDatasetState = atom<dataset>({
  key: 'chartDatasetState',
  default: [],
});
