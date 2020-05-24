export const isNull = (value: CustomAnyType): boolean => value === null;

export const isUndefined = (value: CustomAnyType): boolean => typeof value === 'undefined';

export const isNullOrUndefined = (value: CustomAnyType): boolean => isNull(value) || isUndefined(value);

export const isFunction = (value: CustomAnyType): boolean => typeof value === 'function';

export const isBoolean = (value: CustomAnyType): boolean => typeof value === 'boolean';
