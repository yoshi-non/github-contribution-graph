import {
  ResponseContributionObject,
  githubUsers,
} from '@/store/atoms';
import { useContributions } from './useContributions';
import { ShowUserType } from '@/types/ShowUserType';

export const useGithubUsers = async (
  showUsers: ShowUserType[]
): Promise<githubUsers> => {
  const users = await Promise.all(
    showUsers.map(async (user) => {
      const response = await fetch(
        `https://api.github.com/users/${user.githubId}`
      ).then((res) => res.json());
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

      return {
        id: user.githubId,
        name:
          response.name === null
            ? response.login
            : response.name,
        avatarUrl: response.avatar_url,
        contributionsCollection:
          contributionsCollectionArray,
        allContributions:
          contributionObject.user.contributionsCollection
            .contributionCalendar.totalContributions,
        color: user.color,
      };
    })
  );
  const sortedUsers = users.sort(
    (a, b) => b.allContributions - a.allContributions
  );
  return sortedUsers;
};
