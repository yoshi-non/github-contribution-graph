import { dataset } from '@/types/DatasetType';
import { githubUsers } from '@/types/GitHubApiType';

export const useDatasets = (githubUsers: githubUsers) => {
  const getDatasets = githubUsers.map((user) => {
    return {
      label: user.name,
      data: user.contributionsCollection,
      borderColor: user.color,
      backgroundColor: `#ffffffff`,
    };
  });

  return getDatasets as dataset;
};
