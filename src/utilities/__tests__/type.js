import { isNull, isUndefined, isNullOrUndefined, isFunction, isBoolean } from '../type';

describe('Test utilities for types', () => {
	describe('Test "isNull" utility', () => {
		it('Should be truthy with null', () => {
			expect(isNull(null)).toBeTruthy();
		});

		it('Should be falsy with any other types', () => {
			expect(isNull(undefined)).toBeFalsy();
			expect(isNull(1)).toBeFalsy();
			expect(isNull('Relevant value')).toBeFalsy();
			expect(isNull([])).toBeFalsy();
			expect(isNull({})).toBeFalsy();
			expect(isNull(() => {})).toBeFalsy();
		});
	});

	describe('Test "isUndefined" utility', () => {
		it('Should be truthy with undefined', () => {
			expect(isUndefined(undefined)).toBeTruthy();
		});

		it('Should be falsy with any other types', () => {
			expect(isUndefined(null)).toBeFalsy();
			expect(isUndefined(1)).toBeFalsy();
			expect(isUndefined('Relevant value')).toBeFalsy();
			expect(isUndefined([])).toBeFalsy();
			expect(isUndefined({})).toBeFalsy();
			expect(isUndefined(() => {})).toBeFalsy();
		});
	});

	describe('Test "isNullOrUndefined" utility', () => {
		it('Should be truthy with null or undefined', () => {
			expect(isNullOrUndefined(null)).toBeTruthy();
			expect(isNullOrUndefined(undefined)).toBeTruthy();
		});

		it('Should be falsy with any other types', () => {
			expect(isNullOrUndefined(1)).toBeFalsy();
			expect(isNullOrUndefined('Relevant value')).toBeFalsy();
			expect(isNullOrUndefined([])).toBeFalsy();
			expect(isNullOrUndefined({})).toBeFalsy();
			expect(isNullOrUndefined(() => {})).toBeFalsy();
		});
	});

	describe('Test "isFunction" utility', () => {
		it('Should be truthy with any type of function', () => {
			const arrow = () => { };
			const expression = function () { };
			function declaration () { }

			expect(isFunction(arrow)).toBeTruthy();
			expect(isFunction(expression)).toBeTruthy();
			expect(isFunction(declaration)).toBeTruthy();
		});

		it('Should be falsy with any other types', () => {
			expect(isFunction(null)).toBeFalsy();
			expect(isFunction(undefined)).toBeFalsy();
			expect(isFunction(1)).toBeFalsy();
			expect(isFunction('Relevant value')).toBeFalsy();
			expect(isFunction([])).toBeFalsy();
			expect(isFunction({})).toBeFalsy();
		});
	});

	describe('Test "isBoolean" utility', () => {
		it('Should be truthy with boolean', () => {
			expect(isBoolean(true)).toBeTruthy();
			expect(isBoolean(false)).toBeTruthy();
		});

		it('Should be falsy with any other types', () => {
			expect(isBoolean(null)).toBeFalsy();
			expect(isBoolean(undefined)).toBeFalsy();
			expect(isBoolean(1)).toBeFalsy();
			expect(isBoolean('Relevant value')).toBeFalsy();
			expect(isBoolean([])).toBeFalsy();
			expect(isBoolean({})).toBeFalsy();
			expect(isBoolean(() => {})).toBeFalsy();
		});
	});
});
