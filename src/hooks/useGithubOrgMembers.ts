interface GitHubOrgUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export const useGithubOrgMembers = async (org: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/orgs/${org}/members`
    );

    if (!response.ok) {
      console.log(`Failed to fetch data for ${org}:`);
      return null;
    }

    const responseData = await response.json();

    const githubUserIds = responseData.map(
      (member: GitHubOrgUser) => member.login
    );

    return githubUserIds as string[];
  } catch (error) {
    console.error(`Error fetching data for ${org}:`, error);
    return null;
  }
};
