import { getOctokit } from '$lib/github.client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/** @type {import('./$types').PageLoad} */
export async function load() {
	// TODO get the username from the authenticated user, probably via some firebase session token

	const octokit = await getOctokit();

	// TODO find ways to avoid fetching all of the commits for all the repos
	const repos = await octokit.request('GET /users/nikololay/repos');

	// events API not good enough for this - e.g it doesent catch initial commits
	const commits = await Promise.all(
		repos.data.map((repo) => octokit.request('GET /repos/nikololay/' + repo.name + '/commits'))
	);
	const flatCommits = commits
		.map((x) => x.data)
		.flat()
		.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));

	const lastCommitDate = flatCommits[0].commit.author.date;
	const lastCommitMoment = dayjs(lastCommitDate);

	// streak is consecutive number of days with at least one event that ends today
	const today = new Date();
	const streak = flatCommits.reduce((acc, commit) => {
		const eventDate = new Date(commit.commit.author.date);
		eventDate.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		if (eventDate.getTime() === today.getTime() && !acc.includes(eventDate)) {
			return [...acc, eventDate];
		}
		return acc;
	}, []).length;

	// TODO get cost from the database
	const cost = 0;

	return {
		commits: flatCommits,
		lastCommitDate,
		lastCommitMoment,
		cost,
		streak
	};
}
