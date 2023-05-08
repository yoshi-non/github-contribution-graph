import { Octokit } from '@octokit/core';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { userName } = request.query;

  const octokit = new Octokit({
    auth: process.env.GITHUB_API_KEY,
  });

  const query = `
  query contributions ($userName:String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
  `;

  const contributions = await octokit.graphql(query, {
    userName,
  });

  return response.status(200).json(contributions);
}
