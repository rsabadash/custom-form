import React from 'react';
import { RadioButton } from '../../RadioButton';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const radioItems = [
	{
		value: 'comedy',
		disabled: true
	},
	{
		value: 'historical',
		disabled: false
	},
	{
		value: 'fantasy',
		disabled: false
	}
];

const renderComponent = (props) => {
	const testApi = renderWithWrapper(<RadioButtonGroup { ...props } />);

	return {
		...testApi,
		rerender: (props) => testApi.rerender(<RadioButtonGroup { ...props } />)
	};
};

describe('Test basic RadioButtonGroup component', () => {
	const radioButtonComponentMock = jest.fn((item) => <RadioButton { ...item } />);

	afterEach(() => {
		radioButtonComponentMock.mockClear();
	});

	it('Should render component without items but with message', () => {
		const { getByRole } = renderComponent({
			items: [],
			radioButtonComponent: radioButtonComponentMock
		});

		const radioGroup = getByRole('radiogroup');

		expect(radioGroup).toHaveTextContent('You have to pass at least two items.');
	});

	it('Should render component with items', () => {
		const { getAllByTestId } = renderComponent({
			items: radioItems,
			required: false,
			radioButtonComponent: radioButtonComponentMock
		});

		const radioButtons = getAllByTestId('radioButton');

		expect(radioButtons.length).toBe(3);

		expect(radioButtons[0]).toBeDisabled();
		expect(radioButtons[1]).not.toBeDisabled();
		expect(radioButtons[2]).not.toBeDisabled();

		expect(radioButtonComponentMock).toHaveBeenCalledTimes(3);
	});

	it('Should render component with items and to be required', () => {
		const { getByRole } = renderComponent({
			items: radioItems,
			required: true,
			radioButtonComponent: radioButtonComponentMock
		});

		const radioGroup = getByRole('radiogroup');

		expect(radioGroup).toBeRequired();
	});

	it('Should render component with items and not to be required', () => {
		const { getByRole } = renderComponent({
			items: radioItems,
			required: false,
			radioButtonComponent: radioButtonComponentMock
		});

		const radioGroup = getByRole('radiogroup');

		expect(radioGroup).not.toBeRequired();
	});

	it('Should render heading of radio group', () => {
		const { getByTestId } = renderComponent({
			items: [],
			ariaLabelledBy: 'labelForRadioGroup',
			radioGroupLabel: 'Test radio group',
			radioGroupLabelId: 'labelForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroupHeading = getByTestId('radioGroupHeading');

		expect(radioGroupHeading).toBeInTheDocument();
		expect(radioGroupHeading).toHaveTextContent('Test radio group');
	});

	it('Should not render heading of radio group', () => {
		const { queryByTestId } = renderComponent({
			items: [],
			ariaLabelledBy: 'labelForRadioGroup',
			radioGroupLabel: '',
			radioGroupLabelId: 'labelForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroupHeading = queryByTestId('radioGroupHeading');

		expect(radioGroupHeading).not.toBeInTheDocument();
	});

	it('Should render description of radio group', () => {
		const { getByTestId } = renderComponent({
			items: [],
			ariaDescribedBy: 'descriptionForRadioGroup',
			radioGroupDescription: 'It is radio group',
			radioGroupDescriptionId: 'descriptionForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroupHeading = getByTestId('radioGroupDescription');

		expect(radioGroupHeading).toBeInTheDocument();
		expect(radioGroupHeading).toHaveTextContent('It is radio group');
	});

	it('Should not render description of radio group', () => {
		const { queryByTestId } = renderComponent({
			items: [],
			ariaDescribedBy: 'descriptionForRadioGroup',
			radioGroupDescription: '',
			radioGroupDescriptionId: 'descriptionForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroupHeading = queryByTestId('radioGroupDescription');

		expect(radioGroupHeading).not.toBeInTheDocument();
	});

	it('Should has correct aria-labelledby which related to radioGroupLabelId', () => {
		const { getByRole, getByTestId } = renderComponent({
			items: [],
			ariaLabelledBy: 'irrelevantId',
			radioGroupLabel: 'Test radio group',
			radioGroupLabelId: 'labelForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroup = getByRole('radiogroup');
		const radioGroupHeading = getByTestId('radioGroupHeading');

		expect(radioGroup).toHaveAttribute('aria-labelledby', 'labelForRadioGroup');
		expect(radioGroupHeading).toHaveAttribute('id', 'labelForRadioGroup');
	});

	it('Should has correct aria-describedby which related to radioGroupDescriptionId', () => {
		const { getByRole, getByTestId } = renderComponent({
			items: [],
			ariaDescribedBy: 'irrelevantId',
			radioGroupDescription: 'It is radio group',
			radioGroupDescriptionId: 'descriptionForRadioGroup',
			radioButtonComponent: radioButtonComponentMock,
		});

		const radioGroup = getByRole('radiogroup');
		const radioGroupDescription = getByTestId('radioGroupDescription');

		expect(radioGroup).toHaveAttribute('aria-describedby', 'descriptionForRadioGroup');
		expect(radioGroupDescription).toHaveAttribute('id', 'descriptionForRadioGroup');
	});
});
