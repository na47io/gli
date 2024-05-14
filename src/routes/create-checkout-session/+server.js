import { json } from '@sveltejs/kit';
import { stripe } from '@/stripe.js';

export async function POST({ request }) {
	const YOUR_DOMAIN = 'http://localhost:5173';

	const { priceId } = await request.json();

	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
		line_items: [
			{
				price: priceId
			}
		],
		mode: 'subscription',
		success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${YOUR_DOMAIN}/cancel`
	});

	return json(session);
}
