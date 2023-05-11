import {
  ResponseContributionObject,
  githubUsers,
} from '@/store/atoms';
import { useContributions } from './useContributions';
import { defaultGithubUsers } from '@/githubUsers';

export const useGithubUsers =
  async (): Promise<githubUsers> => {
    const users = await Promise.all(
      defaultGithubUsers.map(async (user) => {
        const response = await fetch(
          `https://api.github.com/users/${user.id}`
        ).then((res) => res.json());
        const contributionObject = (await useContributions(
          user.id
        )) as ResponseContributionObject;

        const contributionsCollectionArray =
          contributionObject.user.contributionsCollection.contributionCalendar.weeks.map(
            (week) =>
              week.contributionDays.reduce(
                (total, day) =>
                  total + day.contributionCount,
                0
              )
          );

        return {
          id: user.id,
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
