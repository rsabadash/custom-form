import { isNullOrUndefined } from './type';

export const isEmptyValue = (value: CustomPrimitiveAnyType): boolean => isNullOrUndefined(value) || String(value).trim() === '';
