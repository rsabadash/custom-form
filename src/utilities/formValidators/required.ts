import { isEmptyValue } from '../string';
import { isBoolean } from '../type';

type Config = {
	errorMessage?: string;
}

export const required = (config: Config = {}) => (value: CustomAnyType): string | null => {
	const { errorMessage } = config;

	let message = 'Required.';

	if (errorMessage && !isEmptyValue(errorMessage)) {
		message = errorMessage;
	}

	let isValidValue = isEmptyValue(value);

	if (isBoolean(value)) {
		isValidValue = !value;
	}

	return isValidValue ? message : null;
};
