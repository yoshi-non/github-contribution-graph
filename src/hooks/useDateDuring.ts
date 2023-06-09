import { defaultGithubUsers } from '@/githubUsers';
import { ResponseContributionObject } from '@/store/atoms';

export const useDateDuring = async () => {
  const response = (await fetch(
    `/api/contributions/${defaultGithubUsers[0].id}`
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
