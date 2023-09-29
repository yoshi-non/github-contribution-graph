import {
  ResponseContributionObject,
  githubUsers,
} from '@/types/GitHubApiType';
import { useContributions } from './useContributions';
import { ShowUserType } from '@/types/ShowUserType';

export const useGithubUsers = async (
  showUsers: ShowUserType[]
): Promise<githubUsers> => {
  const users = await Promise.all(
    showUsers.map(async (user) => {
      const response = await fetch(
        `https://api.github.com/users/${user.githubId}`
      );

      if (!response.ok) {
        console.log(
          `Failed to fetch data for ${user.githubId}:`
        );
        return null;
      }

      const responseData = await response.json();

      const contributionObject = (await useContributions(
        user.githubId
      )) as ResponseContributionObject;

      const contributionsCollectionArray =
        contributionObject.user.contributionsCollection.contributionCalendar.weeks.map(
          (week) =>
            week.contributionDays.reduce(
              (total, day) => total + day.contributionCount,
              0
            )
        );

      const contributionDateDuring =
        contributionObject.user.contributionsCollection.contributionCalendar.weeks.map(
          (week) => {
            return `${week.contributionDays[0].date} ~ ${
              week.contributionDays[
                week.contributionDays.length - 1
              ].date
            }`;
          }
        );

      return {
        id: user.githubId,
        name:
          responseData.name === null
            ? responseData.login
            : responseData.name,
        avatarUrl: responseData.avatar_url,
        contributionsCollection:
          contributionsCollectionArray,
        allContributions:
          contributionObject.user.contributionsCollection
            .contributionCalendar.totalContributions,
        color: user.color,
        contributionDateDuring,
      };
    })
  );

  // ユーザー情報がnullのものを除外する
  const filteredUsers = users.filter(
    (user) => user !== null
  ) as githubUsers;

  return filteredUsers;
};
