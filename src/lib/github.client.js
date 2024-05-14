import { Octokit } from 'octokit';

export const getOctokit = async () => {
	return new Octokit({ auth: import.meta.env.VITE_GITHUB_TOKEN });
};
