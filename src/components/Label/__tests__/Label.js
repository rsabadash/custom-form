import React from 'react';
import { Label } from '../Label';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const renderComponent = (props) => {
	return renderWithWrapper(
		<Label {...props}>
			Test label
		</Label>
	);
};

describe('Test Label component', () => {
	it('Should render label with all passed props', () => {
		const props = {
			labelId: 'testLabel',
			htmlFor: 'someInputId',
			testId: 'labelTest'
		};

		const { getByTestId } = renderComponent(props);

		const label = getByTestId(props.testId);

		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('Test label');
		expect(label).toHaveProperty('id', props.labelId);
		expect(label).toHaveProperty('htmlFor', props.htmlFor);
	});

	it('Should render label with default test id', () => {
		const props = {
			labelId: 'testLabel',
			htmlFor: 'someInputId'
		};

		const { getByTestId } = renderComponent(props);

		const label = getByTestId('label');

		expect(label).toBeInTheDocument();
	});
});
