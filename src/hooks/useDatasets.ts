import { dataset, githubUsers } from '@/store/atoms';

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
