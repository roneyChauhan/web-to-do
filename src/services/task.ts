import { APP_API_URL } from '$env/static/public';
import { postData } from '../helpers/api';
import { ErrorToast } from '../helpers/toasts';

export const addTask = async (data : any) => {
	try {
		const res = await postData({
			url: `${APP_API_URL}/task/`,
			body: data,
		});
        console.log('res', res);
		if (res?.status === 'SUCCESS') {
			return res;
		}
		throw new Error();
	} catch (error) {
		return false;
	}
};