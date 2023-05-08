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
