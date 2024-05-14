import { writable } from 'svelte/store';

export const session = writable({ username: null, loading: false, loggedIn: false, octokit: null });
