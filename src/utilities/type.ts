export const isNull = (value: UnionCustomAnyType): boolean => value === null;

export const isUndefined = (value: UnionCustomAnyType): boolean => typeof value === 'undefined';

export const isNullOrUndefined = (value: UnionCustomAnyType): boolean => isNull(value) || isUndefined(value);

export const isFunction = (value: UnionCustomAnyType): boolean => typeof value === 'function';

export const isBoolean = (value: UnionCustomAnyType): boolean => typeof value === 'boolean';
