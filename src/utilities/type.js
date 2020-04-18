export const isNull = (value) => value === null;

export const isUndefined = (value) => typeof value === 'undefined';

export const isNullOrUndefined = (value) => isNull(value) || isUndefined(value);

export const isFunction = value => typeof value === 'function';
