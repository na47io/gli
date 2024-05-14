<!-- iterate over products and create a card for each -->
<script lang="js">
	import ProductCard from './ProductCard.svelte';
	export let data;

	async function subscribe(priceId) {
		const response = await fetch('/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ priceId })
		});

		const session = await response.json();

		// redirect to session.url
		window.location = session.url;
	}
</script>

<div class="flex flex-col items-center text-center p-6">
	<h1 class="text-4xl font-bold mb-4">Choose Your Plan</h1>
	<p class="text-lg text-gray-700 mb-8">
		Select the plan that best suits your needs. Upgrade, downgrade, or cancel anytime.
	</p>
	<div class={`grid grid-cols-1 md:grid-cols-${data.products.length} gap-6`}>
		{#each data.products as product, index}
			<ProductCard {product} buyHandler={() => subscribe(product.price.id)} />
		{/each}
	</div>
</div>
