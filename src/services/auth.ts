import { browser } from '$app/environment';
import { localKeys } from '../helpers/local-storage';
import { derived, writable } from 'svelte/store';

let userData = null;
let tokenData = null;

if (browser) {
	// Get User from Local Storage
	const userString = localStorage.getItem(localKeys.user);
	if (userString) {
		try {
			userData = JSON.parse(userString);
		} catch (error) {}
	}

	// Get Auth Token from Local Storage
	tokenData = localStorage.getItem(localKeys.token);
}

export const user = writable(userData);
export const token = writable(tokenData);
export const isLoggedIn = derived([user, token], ([userValue, tokenValue]) => {
	return !!userValue && !!tokenValue;
});
