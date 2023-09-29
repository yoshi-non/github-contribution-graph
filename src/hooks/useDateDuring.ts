import { ResponseContributionObject } from '@/types/GitHubApiType';

export const useDateDuring = async () => {
  const response = (await fetch(
    `/api/contributions/yoshi-non`
  ).then((res) =>
    res.json()
  )) as ResponseContributionObject;
  const dateDuring =
    response.user.contributionsCollection.contributionCalendar.weeks.map(
      (week) => {
        return `${week.contributionDays[0].date} ~ ${
          week.contributionDays[
            week.contributionDays.length - 1
          ].date
        }`;
      }
    );
  return dateDuring;
};
