import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

type Config = Pick<AxiosRequestConfig, 'cancelToken' | 'headers'>;

const GET = <T>(url: string, params: { [key: string]: unknown }, config?: Config): AxiosPromise<T> => {
	return axios({
		method: 'GET',
		url,
		params,
		...config
	});
};

const POST = <T>(url: string, data: { [key: string]: unknown }, config?: Config): AxiosPromise<T> => {
	return axios({
		method: 'GET',
		url,
		data,
		...config
	});
};

export {
	GET,
	POST
};