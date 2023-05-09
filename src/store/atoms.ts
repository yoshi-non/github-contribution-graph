import { atom } from 'recoil';

export type ResponseData = {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            contributionCount: number;
            date: string;
          };
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

// ユーザー毎の一週間ごとのコントリビューション数
export const chartUserContributionState = atom<number[]>({
  key: 'chartUserContributionState',
  default: [],
});

export const chartUserContributionListState = atom<
  number[][]
>({
  key: 'chartUserContributionListState',
  default: [],
});

type dataset = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}[];

// グラフに渡すデータセット
export const chartDatasetState = atom<dataset>({
  key: 'chartDatasetState',
  default: [],
});
