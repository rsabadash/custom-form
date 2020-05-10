import { isEmptyValue } from '../string';
import { isBoolean } from '../type';

export const required = (config = {}) => (value) => {
	const { errorMessage } = config;

	const message = isEmptyValue(errorMessage)
		? 'Required.'
		: errorMessage;

	let isValidValue = isEmptyValue(value);

	if (isBoolean(value)) {
		isValidValue = !value;
	}

	return isValidValue ? message : null;
};
