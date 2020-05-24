import { isNullOrUndefined } from './type';

export const isEmptyValue = (value: CustomAnyType): boolean => isNullOrUndefined(value) || String(value).trim() === '';
