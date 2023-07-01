import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isLoggedIn } from '../services/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
	let authorized = false; 
    // get(isLoggedIn);
	if (authorized) {
		if (url.pathname.startsWith('/auth')) {
			throw redirect(302, '/');
		} else {
			return {};
		}
	} else {
		if (url.pathname.startsWith('/auth')) {
			return {};
		}
		throw redirect(302, '/auth/login');
	}
};
