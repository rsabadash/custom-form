import React from 'react';
import { Button } from '../Button';
import { fireEvent } from '@testing-library/react';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const renderComponent = (props) => {
	return renderWithWrapper(
		<Button {...props}>
			{props.children}
		</Button>
	);
};

describe('Test Button component', () => {
	it('Should render component with children', () => {
		const props = {
			id: 'testButton',
			children: 'Test button'
		};

		const { getByTestId } = renderComponent(props);

		const button = getByTestId(props.id);

		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent(props.children);
	});

	it('Should run passed onClick handler', () => {
		const handleClickMock = jest.fn();

		const props = {
			id: 'testButton',
			children: 'Test button',
			handleClick: handleClickMock
		};

		const { getByTestId } = renderComponent(props);

		const button = getByTestId(props.id);

		fireEvent.click(button);

		expect(handleClickMock).toHaveBeenCalledTimes(1);
	});
});
