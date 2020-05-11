import React from 'react';
import { fireEvent } from '@testing-library/react';
import { RadioButton } from '../RadioButton';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const renderComponent = (props) => {
	const testApi = renderWithWrapper(<RadioButton { ...props } />);

	return {
		...testApi,
		rerender: (props) => testApi.rerender(<RadioButton { ...props } />)
	};
};

describe('Test basic RadioButton component', () => {
	it('Should render component with all props except event handlers', () => {
		const { getByTestId } = renderComponent({
			name: 'testRadioButton',
			value: 'Radio value',
			checked: false,
			disabled: false,
			ariaLabel: 'Test radio',
			ariaLabelledBy: 'labelled-by-element',
			ariaDescribedBy: 'described-by-element'
		});

		const radioButton = getByTestId('radioButton');

		expect(radioButton).toBeInTheDocument();

		expect(radioButton).toHaveAttribute('name', 'testRadioButton');
		expect(radioButton).toHaveAttribute('type', 'radio');
		expect(radioButton).toHaveAttribute('aria-label', 'Test radio');
		expect(radioButton).toHaveAttribute('aria-labelledby', 'labelled-by-element');
		expect(radioButton).toHaveAttribute('aria-describedby', 'described-by-element');

		expect(radioButton).toBeEnabled();
		expect(radioButton).not.toBeChecked();
	});

	it('Should render component with disabled and checked props set to true', () => {
		const { getByTestId } = renderComponent({
			checked: true,
			disabled: true
		});

		const radioButton = getByTestId('radioButton');

		expect(radioButton).toBeDisabled();
		expect(radioButton).toBeChecked();
	});

	it('Should fire passed events handler and change checked value from false to true', () => {
		const handleOnBlur = jest.fn();
		const handleOnChange = jest.fn();

		const { getByTestId, rerender } = renderComponent({
			onChange: handleOnChange,
			checked: false
		});

		const radioButton = getByTestId('radioButton');

		expect(radioButton).not.toBeChecked();

		// should use click instead change event on radio/checkbox
		fireEvent.click(radioButton, { target: { value: 'Radio value' } });
		expect(handleOnChange).toHaveBeenCalledTimes(1);

		rerender({
			onBlur: handleOnBlur,
			checked: true
		});

		expect(radioButton).toBeChecked();

		fireEvent.blur(radioButton);
		expect(handleOnBlur).toHaveBeenCalledTimes(1);
	});
});
