import { APP_API_URL } from '$env/static/public';
import { deleteData, getData, postData, putData } from '../helpers/api';
import { ErrorToast } from '../helpers/toasts';

export const getTasks = async (query : any = {}) => {
	try {
		const res = await getData({
			url: `${APP_API_URL}/task/`,
			query,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};

export const getTask = async (taskId : string) => {
	try {
		const res = await getData({
			url: `${APP_API_URL}/task/${taskId}`,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};

export const addTask = async (data : any) => {
	try {
		const res = await postData({
			url: `${APP_API_URL}/task/`,
			body: data,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};

export const updateTask = async (taskId : string, data : any) => {
	try {
		const res = await putData({
			url: `${APP_API_URL}/task/${taskId}`,
            body: data,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};

export const updateTaskStatus = async (taskId : string, data : any) => {
	try {
		const res = await putData({
			url: `${APP_API_URL}/task/${taskId}/status`,
            body: data,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};

export const deleteTask = async (taskId : string) => {
	try {
		const res = await deleteData({
			url: `${APP_API_URL}/task/${taskId}`,
		});
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};
