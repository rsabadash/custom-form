import { isEmptyValue } from '../string';

export const minLength = (config) => (value) => {
	const { minLength, errorMessage } = config;
	const placeholderRegex = /{minLength}/gi;
	const trimmedValue = isEmptyValue(value) ? '' : value.trim();

	const message = isEmptyValue(errorMessage)
		? `Field must contains at least ${config.minLength} characters.`
		: errorMessage.replace(placeholderRegex, `${config.minLength}`);

	return String(trimmedValue).length < minLength ? message : null;
};
