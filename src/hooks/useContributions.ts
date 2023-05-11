export const useContributions = async (
  userName: string
) => {
  const response = await fetch(
    `/api/contributions/${userName}`
  );

  return await response.json();
};
