import React from 'react';
import { FieldError } from '../FieldError';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const renderComponent = (props) => {
	return renderWithWrapper(
		<FieldError {...props}>
			{props.errorMessage}
		</FieldError>
	);
};

describe('Test FieldError component', () => {
	it('Should render error message with all passed props', () => {
		const props = {
			id: 'testFieldError',
			errorMessage: 'Test error',
		};

		const { getByRole } = renderComponent(props);

		const fieldError = getByRole('status');

		expect(fieldError).toBeInTheDocument();
		expect(fieldError).toHaveTextContent(props.errorMessage);
		expect(fieldError).toHaveProperty('id', props.id);
	});

	it('Should render error message with default test id', () => {
		const props = {
			errorMessage: 'Test error'
		};

		const { getByTestId } = renderComponent(props);

		const fieldError = getByTestId('fieldError');

		expect(fieldError).toBeInTheDocument();
	});

	it('Should render error message with custom test id', () => {
		const props = {
			testId: 'fieldErrorTest',
			errorMessage: 'Test error'
		};

		const { getByTestId } = renderComponent(props);

		const fieldError = getByTestId(props.testId);

		expect(fieldError).toBeInTheDocument();
	});

	it('Should throw error if "errorMessage" prop is empty', () => {
		const spyError = jest.spyOn(console, 'error').mockImplementation(() => null);

		expect(() => renderComponent({})).toThrowError('Passed in FieldError component prop "errorMessage" should not be empty.');

		spyError.mockRestore();
	});
});
