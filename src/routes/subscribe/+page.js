import { stripe } from '@/stripe.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const products = await stripe.products.list({
		active: true
	});

	const productsWithPrice = products.data
		.map(async (product) => {
			return {
				...product,
				price: await stripe.prices.retrieve(product.default_price)
			};
		})
		.sort((a, b) => (a.price.unit_amount ?? 0) - (b.price.unit_amount ?? 0));

	return {
		products: await Promise.all(productsWithPrice)
	};
}
