import { isNullOrUndefined } from './type';

export const isEmptyValue = (value
) => isNullOrUndefined(value) || String(value).trim() === '';
