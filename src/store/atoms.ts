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
  contributionDateDuring?: string[];
}[];

export type dataset = {
  label: string;
  data: (number | undefined)[];
  borderColor: string;
  backgroundColor: string;
}[];
