import { isEmptyValue, isNullOrUndefined } from './utilities';

export const required = (config = {}) => (value) => {
	const { errorMessage } = config;
	const message = isNullOrUndefined(errorMessage)
		? 'Required'
		: errorMessage;

	return isEmptyValue(value) ? message : null;
};
