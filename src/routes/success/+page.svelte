<script>
	export let planName;
	export let planDescription;
	export let steps = [
		'Sign in to your account.',
		'Go to the dashboard.',
		'Enjoy your new subscription benefits.'
	];

	const goToBillingPortal = () => {
		// Redirect to billing portal, replace with your actual URL
		window.location.href = 'https://billing.example.com';
	};
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
	<div class="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
		<h1 class="text-3xl font-bold text-center text-green-500 mb-4">Congratulations!</h1>
		<p class="text-center text-gray-700 mb-4">
			You have successfully subscribed to the <span class="font-semibold">{planName}</span> plan.
		</p>
		<p class="text-center text-gray-600 mb-6">{planDescription}</p>
		<div class="mb-6">
			<h2 class="text-xl font-semibold text-gray-800 mb-2">How It Works</h2>
			<ol class="list-decimal list-inside text-gray-700">
				{#each steps as step}
					<li class="mb-1">{step}</li>
				{/each}
			</ol>
		</div>
		<button
			on:click={goToBillingPortal}
			class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors w-full"
		>
			Go to Billing Portal
		</button>
	</div>
</div>
