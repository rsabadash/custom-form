import { isNullOrUndefined } from './utilities';

export const minLength = (config) => (value) => {
	const { minLength, errorMessage } = config;
	const message = isNullOrUndefined(errorMessage)
		? `Field must contains at least ${config.minLength} characters.`
		: errorMessage;

	return String(value).length < minLength ? message : null;
};
