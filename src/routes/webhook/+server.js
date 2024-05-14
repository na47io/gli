import { stripe } from '@/stripe';

export async function POST({ request }) {
	const endpointSecret = 'whsec_812b779572849dc884fd183aac334172712d3122db092ece88198096dbc0ecb1';
	const sig = request.headers.get('stripe-signature');

	let event;

	try {
		event = stripe.webhooks.constructEvent(await request.text(), sig, endpointSecret);
	} catch (err) {
		return new Response(400, err.message);
	}

	switch (event.type) {
		case 'customer.subscription.created':
			handleCustomerSubscriptionCreated(event);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a 200 response to acknowledge receipt of the event
	return new Response(200);
}

function handleCustomerSubscriptionCreated(event) {
	const customerSubscriptionCreated = event.data.object;
	console.log('customer.subscription.created', customerSubscriptionCreated);

	// TODO save the subscription to the database
}
