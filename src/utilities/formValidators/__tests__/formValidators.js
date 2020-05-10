import { minLength, required } from '../index';

describe('Test validators for form fields', () => {
	describe('Test "minLength" validator', () => {
		it('Should return default error message if value has less than 5 characters', () => {
			const minLengthValidator = minLength({ minLength: 5 });

			expect(minLengthValidator('Test')).toBe('Field must contains at least 5 characters.');
		});

		it('Should trim empty spaces and return error message if value has less than 5 characters', () => {
			const minLengthValidator = minLength({ minLength: 5 });

			expect(minLengthValidator('Test ')).toBe('Field must contains at least 5 characters.');
		});

		it('Should return custom error message if value has less than 5 characters', () => {
			const minLengthValidator = minLength({
				errorMessage: 'Enter not less than {minLength} characters, please.',
				minLength: 5
			});

			expect(minLengthValidator('Test')).toBe('Enter not less than 5 characters, please.');
		});

		it('Should return default error message if errorMessage option is set but empty', () => {
			const minLengthValidator = minLength({
				errorMessage: '',
				minLength: 5
			});

			expect(minLengthValidator('Test')).toBe('Field must contains at least 5 characters.');
		});

		it('Should return error message if min length is set and value is null or undefined', () => {
			const minLengthValidator = minLength({ minLength: 5 });

			expect(minLengthValidator(null)).toBe('Field must contains at least 5 characters.');
			expect(minLengthValidator(undefined)).toBe('Field must contains at least 5 characters.');
		});

		it('Should not return error message if value has more than 5 characters', () => {
			const minLengthValidator = minLength({
				errorMessage: 'Enter not less than {minLength} characters, please.',
				minLength: 5
			});

			expect(minLengthValidator('Test value')).toBeNull();
		});
	});

	describe('Test "required" validator', () => {
		it('Should return default error message if value is empty', () => {
			const requiredValidator = required();

			expect(requiredValidator('')).toBe('Required.');
		});

		it('Should trim empty spaces and return error message if value is empty', () => {
			const requiredValidator = required();

			expect(requiredValidator('   ')).toBe('Required.');
		});

		it('Should return custom error message if value is empty', () => {
			const requiredValidator = required({ errorMessage: 'This field is required.' });

			expect(requiredValidator('')).toBe('This field is required.');
		});

		it('Should return default error message if errorMessage option is set but empty', () => {
			const requiredValidator = required({ errorMessage: '' });

			expect(requiredValidator('')).toBe('Required.');
		});

		it('Should return error message if value is null or undefined', () => {
			const requiredValidator = required();

			expect(requiredValidator(null)).toBe('Required.');
			expect(requiredValidator(undefined)).toBe('Required.');
		});

		it('Should return error message if value is falsy boolean (false)', () => {
			const requiredValidator = required();

			expect(requiredValidator(false)).toBe('Required.');
		});

		it('Should not return error message if value is truthy boolean (true)', () => {
			const requiredValidator = required();

			expect(requiredValidator(true)).toBeNull();
		});

		it('Should not return error message if value exists', () => {
			const requiredValidator = required();

			expect(requiredValidator('Test')).toBeNull();
		});
	});
});
