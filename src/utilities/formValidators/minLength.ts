import { isEmptyValue } from '../string';
import { isNullOrUndefined } from '../type';

type Config = {
	minLength: number;
	errorMessage?: string;
}

export const minLength = (config: Config) => (value: CustomAnyType): string | null | never  => {
	const { minLength, errorMessage } = config;

	if (isNullOrUndefined(minLength)) {
		throw new Error('minLength is required option for minLength validator');
	}

	const placeholderRegex = /{minLength}/gi;
	const trimmedValue = isEmptyValue(value) ? '' : String(value).trim();

	let message = `Field must contains at least ${config.minLength} characters.`;

	if (errorMessage && !isEmptyValue(errorMessage)) {
		message = errorMessage.replace(placeholderRegex, `${config.minLength}`);
	}

	return String(trimmedValue).length < minLength ? message : null;
};
