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
	const githubUserEvents = await octokit.request('GET /users/nikololay/events');
	const events = githubUserEvents.data
		.filter((x) => x.type === 'PushEvent')
		.map((x) => ({ ...x, created_at_moment: dayjs(x.created_at) }));

	const lastCommitDate = events[0].created_at;

	const lastCommitMoment = dayjs(lastCommitDate);

	console.log(events);

	// streak is consecutive number of days with at least one event that ends today
	const today = new Date();
	const streak = events.reduce((acc, event) => {
		const eventDate = new Date(event.created_at);
		today.setHours(0, 0, 0, 0);
		if (eventDate.getTime() === today.getTime()) {
			acc++;
		}
		return acc;
	}, 0);

	// TODO get cost from the database
	const cost = 0;

	return {
		events,
		lastCommitDate,
		lastCommitMoment,
		cost,
		streak
	};
}
