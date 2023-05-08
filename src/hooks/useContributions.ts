export const useContributions = () => {
  const getContributions = async (userName: string) => {
    const response = await fetch(
      `/api/contributions/${userName}`
    );

    return await response.json();
  };

  return {
    getContributions,
  };
};
