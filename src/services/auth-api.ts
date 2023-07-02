import { goto } from '$app/navigation';
import { localKeys } from './../helpers/local-storage';
import { get } from 'svelte/store';
import { token, user } from './auth';
import { APP_API_URL } from '$env/static/public';
import { ErrorToast } from '../helpers/toasts';

export const loginUser = async (body: { email: string; password: string }) => {
	try {
		const res = await fetch(`${APP_API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			const data = (await res.json()).data;
			if (data && data?.user && data?.token) {
				localStorage.setItem(localKeys.user, JSON.stringify(data.user));
				localStorage.setItem(localKeys.token, data.token);
				user.set(data.user);
				token.set(data.token);
				goto('/');
				return true;
			}
			ErrorToast.show('can not login');
			return false;
		} else {
			if (res.status === 401) {
				ErrorToast.show('check credentials');
			} else if (res.status === 404) {
				ErrorToast.show('email Not Found');
			} else {
				ErrorToast.show('something Wrong');
			}
			return false;
		}
	} catch (error) {
        ErrorToast.show('something Wrong');
		return false;
	}
};

export const registerUser = async (body: { name :string; email: string; password: string, cpassword : string }) => {
	try {
		const res = await fetch(`${APP_API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		if (res.ok) {
			const data = (await res.json()).data;
			if (data && data?.user && data?.token) {
				localStorage.setItem(localKeys.user, JSON.stringify(data.user));
				localStorage.setItem(localKeys.token, data.token);
				user.set(data.user);
				token.set(data.token);
				goto('/');
				return true;
			}
			ErrorToast.show('can not register');
			return false;
		} else {
            ErrorToast.show('something Wrong');
			return false;
		}
	} catch (error) {
        ErrorToast.show('something Wrong');
		return false;
	}
};

export const logoutUser = async () => {
	try {
		localStorage.removeItem(localKeys.user);
		localStorage.removeItem(localKeys.token);
		// postData({ url: `${API_URL}/auth/logout`, body: {} });
		user.set(null);
		token.set(null);
		goto('/auth/login');
		return true;
	} catch (error) {
		// ErrorToast.show(get(t)('apiErrors.somethingWrong'));
		return false;
	}
};