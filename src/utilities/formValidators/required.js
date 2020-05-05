import { isEmptyValue, isNullOrUndefined } from './utilities';

export const required = (config = {}) => (value) => {
	const { errorMessage } = config;
	const message = isNullOrUndefined(errorMessage)
		? 'Required.'
		: errorMessage;

	let isValidValue = isEmptyValue(value);

	if (typeof value === 'boolean') {
		isValidValue = !value;
	}

	return isValidValue ? message : null;
};
