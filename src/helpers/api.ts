import { token, user } from '../services/auth';
import { get } from 'svelte/store';
type APIInput = {
	url?: string;
	query?: any;
};

type GetInput = APIInput & {};
type PostInput = APIInput & {
	multipart?: boolean;
	body?: any;
};
type PutInput = PostInput;
type DeleteInput = GetInput;

export const ContentTypes = {
	json: 'application/json',
	text: 'text/html',
	multipart: 'multipart/form-data',
};

export const CommonHeaders = {
	'cache-control': 'no-cache',
	pragma: 'no-cache',
};

export const getData = ({ url, query = {} }: GetInput): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const queryString = new URLSearchParams(query).toString();
		const tokenString = get(token);
		const userData = get(user);

		try {
			const res = await fetch(url + (queryString ? `?${queryString}` : ''), {
				method: 'get',
				headers: {
					'content-type': ContentTypes.json,
					...CommonHeaders,
					...(tokenString ? { Authorization: 'Bearer ' + tokenString } : {}),
				},
			});
            if (res?.ok) {
                resolve(await res.json());
            } else {
                reject({ status: res.status });
            }
		} catch (error) {
			console.error('API ERROR : ', error);
			reject(error);
		}
	});
};

export const postData = ({ url, body, query = {}, multipart = false }: PostInput): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const queryString = new URLSearchParams(query).toString();
		const tokenString = get(token);
		const userData = get(user);
		try {
			const res = await fetch(url + (queryString ? `?${queryString}` : ''), {
				method: 'post',
				headers: {
					...(multipart ? {} : { 'content-type': ContentTypes.json }),
					...CommonHeaders,
					...(tokenString ? { Authorization: 'Bearer ' + tokenString } : {}),
				},
				body: multipart ? body : JSON.stringify(body),
			});
            if (res?.ok) {
                resolve(await res.json());
            } else {
                reject({ status: res.status });
            }
		} catch (error) {
			console.error('API ERROR : ', error);
			reject(error);
		}
	});
};

export const putData = ({ url, body, query = {}, multipart = false }: PutInput): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const queryString = new URLSearchParams(query).toString();
		const tokenString = get(token);
		const userData = get(user);

		try {
			const res = await fetch(url + (queryString ? `?${queryString}` : ''), {
				method: 'put',
				headers: {
					...(multipart ? {} : { 'content-type': ContentTypes.json }),
					...CommonHeaders,
					...(tokenString ? { Authorization: 'Bearer ' + tokenString } : {}),
				},
				body: multipart ? body : JSON.stringify(body),
			});
            if (res?.ok) {
                resolve(await res.json());
            } else {
                reject({ status: res.status });
            }
		} catch (error) {
			console.error('API ERROR : ', error);
			reject(error);
		}
	});
};

export const deleteData = ({ url, query = {} }: DeleteInput): Promise<any> => {
	return new Promise(async (resolve, reject) => {
		const queryString = new URLSearchParams(query).toString();
		const tokenString = get(token);
		const userData = get(user);
		try {
			const res = await fetch(url + (queryString ? `?${queryString}` : ''), {
				method: 'delete',
				headers: {
					'content-type': ContentTypes.json,
					...CommonHeaders,
					...(tokenString ? { Authorization: 'Bearer ' + tokenString } : {})
				},
			});
            if (res?.ok) {
                resolve(await res.json());
            } else {
                reject({ status: res.status });
            }
		} catch (error) {
			console.error('API ERROR : ', error);
			reject(error);
		}
	});
};