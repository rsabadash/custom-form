import { isEmptyValue } from '../string';

describe('Test utilities for string', () => {
	describe('Test "isEmptyValue" utility', () => {
		it('Should be truthy with empty string', () => {
			expect(isEmptyValue('')).toBeTruthy();
		});

		it('Should be truthy with null', () => {
			expect(isEmptyValue(null)).toBeTruthy();
		});

		it('Should be truthy with undefined', () => {
			expect(isEmptyValue(undefined)).toBeTruthy();
		});

		it('Should be falsy with value of type number', () => {
			expect(isEmptyValue(1)).toBeFalsy();
		});

		it('Should be falsy with not empty string', () => {
			expect(isEmptyValue('Relevant value')).toBeFalsy();
		});
	});
});
