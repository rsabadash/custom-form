import React from 'react';
import { fireEvent } from '@testing-library/react';
import { TextField } from '../TextField';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const renderComponent = (props) => {
	return renderWithWrapper(<TextField { ...props } />);
};

describe('Test basic TextField component', () => {
	it('Should render component with all props except event handlers', () => {
		const { getByTestId } = renderComponent({
			name: 'testInput',
			type: 'text',
			value: 'Initial value',
			invalid: false,
			disabled: false,
			required: false,
			ariaLabel: 'Test input',
			placeholder: 'Enter value',
			ariaLabelledBy: 'labelled-by-element',
			ariaDescribedBy: 'described-by-element'
		});

		const textField = getByTestId('textField');

		expect(textField).toBeInTheDocument();

		expect(textField).toHaveAttribute('name', 'testInput');
		expect(textField).toHaveAttribute('type', 'text');
		expect(textField).toHaveAttribute('aria-label', 'Test input');
		expect(textField).toHaveAttribute('aria-labelledby', 'labelled-by-element');
		expect(textField).toHaveAttribute('aria-describedby', 'described-by-element');
		expect(textField).toHaveAttribute('placeholder', 'Enter value');

		expect(textField).toHaveValue('Initial value');

		expect(textField).toBeValid();
		expect(textField).toBeEnabled();
		expect(textField).not.toBeRequired();
	});

	it('Should render component with invalid, disabled and required props set to true', () => {
		const { getByTestId } = renderComponent({
			invalid: true,
			disabled: true,
			required: true
		});

		const textField = getByTestId('textField');

		expect(textField).toBeInvalid();
		expect(textField).toBeDisabled();
		expect(textField).toBeRequired();
	});

	it('Should fire passed events handler', () => {
		const handleOnBlur = jest.fn();
		const handleOnChange = jest.fn();

		const { getByTestId } = renderComponent({
			onBlur: handleOnBlur,
			onChange: handleOnChange
		});

		const textField = getByTestId('textField');

		fireEvent.focus(textField);
		fireEvent.change(textField, { target: { value: 'T' } });
		fireEvent.change(textField, { target: { value: 'Te' } });

		expect(handleOnChange).toHaveBeenCalledTimes(2);

		fireEvent.blur(textField);
		expect(handleOnBlur).toHaveBeenCalledTimes(1);
	});
});
