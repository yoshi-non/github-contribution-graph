export const useCheckGithubId = async (
  githubId: string
) => {
  // githubIdが存在するかどうかをチェックする
  const response = await fetch(
    `https://api.github.com/users/${githubId}`
  );
  if (!response.ok) {
    return false;
  }
  return true;
};
