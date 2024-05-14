<script>
	export let product;
	export let classy = '';
	export let buyHandler = () => {};
</script>

<div
	class={`flex flex-col justify-between border border-gray-300 rounded-lg p-6 m-4 max-w-xs shadow-md transition-shadow hover:shadow-lg ${classy}`}
>
	<div>
		<h2 class="text-xl font-semibold mb-2">{product.name}</h2>
		<p class="text-gray-600 flex-grow">{product.description}</p>
	</div>
	<img src={product.images[0]} alt={product.name} class="mt-4 rounded-lg" />
	<div class="mt-4 flex items-center justify-between">
		<div class="text-gray-900 font-medium">
			{product.price.unit_amount / 100}
			{product.price.currency.toUpperCase()} per {product.price.recurring.interval}
		</div>
		<button
			on:click={buyHandler}
			class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
		>
			Get {product.name.replace('Get Locked In', 'GLI')}
		</button>
	</div>
</div>
