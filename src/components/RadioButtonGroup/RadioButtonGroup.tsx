import React from 'react';
import { Heading } from '../Heading';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/index.scss';

type RadioButtonItem = {
	value: string;
	disabled?: boolean;
	label: string;
};

type RadioButtonGroupProps = {
	items: RadioButtonItem[],
	required?: boolean,
	ariaLabelledBy?: string;
	ariaDescribedBy?: string;
	radioGroupLabel?: string;
	radioGroupLabelId?: string;
	radioGroupDescription?: string;
	radioGroupDescriptionId?: string;
	radioButtonComponent: (item: RadioButtonItem) => JSX.Element // check if it is a function and then describe it in test
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = (
	{
		items,
		required,
		ariaLabelledBy,
		ariaDescribedBy,
		radioGroupLabel,
		radioGroupLabelId,
		radioGroupDescription,
		radioGroupDescriptionId,
		radioButtonComponent // check if it is a function and then describe it in test
	}
) => {
	const hasItems = items.length > 1;
	const hasRadioGroupLabel = !isEmptyValue(radioGroupLabel);
	const hasRadioGroupDescription = !isEmptyValue(radioGroupDescription);

	const radioGroupLabelledBy = radioGroupLabelId !== ariaLabelledBy && hasRadioGroupLabel
		? radioGroupLabelId
		: ariaLabelledBy;

	const radioGroupDescribedBy = radioGroupDescriptionId !== ariaDescribedBy && hasRadioGroupDescription
		? radioGroupDescriptionId
		: ariaDescribedBy;

	return (
		<div
			role="radiogroup"
			className={classes.radioButtonGroup}
			aria-required={required}
			aria-describedby={radioGroupDescribedBy} // which element describe input
			aria-labelledby={radioGroupLabelledBy} // which element has label for radio group
		>
			{
				hasRadioGroupLabel && (
					<Heading
						level={2}
						id={radioGroupLabelId}
						classNameHeading={classes.radioButtonGroup__title}
						testId="radioGroupHeading"
					>
						{/*// @ts-ignore*/}
						{radioGroupLabel}
					</Heading>
				)
			}
			{
				hasRadioGroupDescription && (
					<p
						id={radioGroupDescriptionId}
						data-testid="radioGroupDescription"
					>
						{radioGroupDescription}
					</p>
				)
			}
			{
				hasItems
					? (
						<div className={classes.radioButtonGroup__radioButtonsContainer}>
							{
								items.map((item) => {
									return (
										<div
											key={item.value}
											className={classes.radioButtonGroup__radioButton}
										>
											{radioButtonComponent(item)}
										</div>
									);
								})
							}
						</div>
					)
					: <div>You have to pass at least two items.</div>
			}
		</div>
	);
};

export { RadioButtonGroup };
