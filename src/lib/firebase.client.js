import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { browser } from '$app/environment';
import { getFirestore } from 'firebase/firestore';

export let db;
export let app;
export let auth;

const firebaseConfig = {
	apiKey: 'AIzaSyCPmjLQYM5Bs5Kbbc_yk2s-dm_vlmV2qLU',
	authDomain: 'get-locked-in.firebaseapp.com',
	projectId: 'get-locked-in',
	storageBucket: 'get-locked-in.appspot.com',
	messagingSenderId: '19575999892',
	appId: '1:19575999892:web:239c7095dce39179565381',
	measurementId: 'G-8N77YV6N5T'
};

export const initializeFirebase = () => {
	if (!browser) {
		throw new Error("Can't use the Firebase client on the server.");
	}
	if (!app) {
		app = initializeApp(firebaseConfig);
		auth = getAuth(app);
		db = getFirestore(app);

		if (firebaseConfig.useEmulator) {
			connectAuthEmulator(auth, 'http://127.0.0.1:9099');
		}
	}
};
