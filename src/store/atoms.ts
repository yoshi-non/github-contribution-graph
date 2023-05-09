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
};

export const contributionState = atom<ResponseData>({
  key: 'contributionState',
  default: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 0,
          weeks: [],
        },
      },
    },
  },
});

export const contributionListState = atom<ResponseData[]>({
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
