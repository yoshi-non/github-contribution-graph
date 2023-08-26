import { atom } from 'recoil';

export type ResponseContributionObject = {
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
};

export type githubUsers = {
  id: string;
  name?: string;
  avatarUrl?: string;
  contributionsCollection?: number[];
  allContributions?: number;
  color: string;
}[];

// コントリビューションの一週間のはじまりとおわりの日付
export const contributionDateDuringState = atom<string[]>({
  key: 'contributionDateDuringState',
  default: [],
});

export type dataset = {
  label: string;
  data: (number | undefined)[];
  borderColor: string;
  backgroundColor: string;
}[];

// グラフに渡すデータセット
export const datasetState = atom<dataset>({
  key: 'datasetState',
  default: [],
});
