<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let currentStep = 0;
	let mainSection;
	let navbar;

	const steps = [
		{
			icon: 'fas fa-user-plus',
			text: 'Connect your GitHub account to start tracking your progress.'
		},
		{
			icon: 'fas fa-check-circle',
			text: "We monitor your GitHub commits daily to ensure you're making progress."
		},
		{
			icon: 'fas fa-envelope-open-text',
			text: "Receive encouraging emails when you commit, and motivational emails when you don't."
		},
		{
			icon: 'fas fa-dollar-sign',
			text: 'If you miss a day, you owe a pre-set amount, making you more committed to your goals.'
		}
	];

	onMount(() => {
		// Simulate moving through the steps
		const interval = setInterval(() => {
			currentStep = (currentStep + 1) % steps.length;
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<main
	bind:this={mainSection}
	class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-4"
>
	<header class="text-center mb-8">
		<h1 class="text-5xl font-bold mb-4">Get Locked In</h1>
		<p class="text-2xl font-medium text-gray-700">
			Achieve your goals with accountability and commitment
		</p>
	</header>

	<section class="text-center max-w-5xl mb-8 relative">
		<div class="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gray-300"></div>
		{#each steps as step, index}
			<div class="flex items-center mb-8">
				<div
					class="flex-shrink-0 transform transition-transform duration-500 {currentStep === index
						? 'scale-125 text-green-500'
						: 'text-gray-500'}"
				>
					<i class="{step.icon} text-4xl"></i>
				</div>
				<div
					class="ml-8 text-left {currentStep === index ? 'block' : 'hidden'}"
					transition:fly={{ x: 50, duration: 500 }}
				>
					<p class="text-xl font-semibold">{index + 1}. {step.text}</p>
				</div>
			</div>
		{/each}
	</section>

	<footer class="text-center">
		<a
			href="./subscribe"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
			>Get Started</a
		>
	</footer>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
