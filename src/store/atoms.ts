import { atom } from 'recoil';

interface Contribution {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: Contribution[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface User {
  contributionsCollection: ContributionsCollection;
}

interface ResponseData {
  user: User;
}

export const contributionListState = atom<ResponseData>({
  key: 'contributionListState',
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
