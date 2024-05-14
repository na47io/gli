<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
	import { session } from '$lib/session';

	export let data;
	let loading = true;
	let loggedIn = false;

	session.subscribe((curr) => {
		loading = curr.loading;
		loggedIn = curr.loggedIn;
	});

	onMount(async () => {
		const user = await data.getAuthUser();

		// TODO verify the email
		// const loggedIn = !!user && user?.emailVerified;

		const loggedIn = !!user;
		session.update((cur) => {
			loading = false;
			return {
				...cur,
				user,
				loggedIn,
				loading: false
			};
		});

		if (loggedIn) {
			goto('/dashboard');
			// TODO store github username
		}
	});

	async function authWithPopup() {
		const auth = getAuth();
		const provider = new GithubAuthProvider();
		provider.addScope('repo');
		signInWithPopup(auth, provider)
			.then(function (result) {
				// This gives you a GitHub Access Token. You can use it to access the GitHub API.
				const credential = GithubAuthProvider.credentialFromResult(result);
				const user = result.user;

				console.log(credential?.accessToken);

				session.update((cur) => {
					loading = false;
					return {
						...cur,
						user,
						loggedIn: true,
						loading: false
					};
				});
				goto('/dashboard');
			})
			.catch((error) => {
				console.log('reeeee');
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GithubAuthProvider.credentialFromError(error);
				// ...
			});
	}

	async function logout() {
		const auth = getAuth();
		await auth.signOut();
		session.update((cur) => {
			return {
				...cur,
				user: null,
				loggedIn: false,
				octokit: null
			};
		});
		goto('/');
	}
</script>

<nav class="bg-gray-800 p-4 text-white flex flex-wrap items-center justify-between">
	<div class="flex items-center space-x-4">
		<button
			class="block lg:hidden px-2 py-1 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
			aria-label="Toggle navigation"
		>
			<svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<title>Menu</title>
				<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
			</svg>
		</button>
	</div>
	<ul class="hidden lg:flex flex-grow items-center space-x-4">
		<li><a href="/" class="hover:text-gray-300">Home</a></li>
		{#if $session.loggedIn}
			<li><a href="/dashboard" class="hover:text-gray-300">Dashboard</a></li>
		{/if}
		<li><a href="/about" class="hover:text-gray-300">About</a></li>
		{#if !$session.loggedIn}
			<li><a href="/subscribe" class="hover:text-gray-300">Subscribe</a></li>
		{/if}
	</ul>
	<div class="flex items-center space-x-4">
		{#if $session.loggedIn}
			<span class="text-gray-300">{$session.user.reloadUserInfo.screenName}</span>
			<button on:click={logout} class=" text-white font-bold py-2 px-4 rounded">Log out</button>
		{:else}
			<button
				on:click={authWithPopup}
				class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>Sign in with GitHub</button
			>
		{/if}
	</div>
</nav>

<slot></slot>

<style>
	/* Tailwind CSS styles are automatically included from your configuration */
</style>
