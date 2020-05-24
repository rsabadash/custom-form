import React from 'react';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { AccessibleRadioButton } from './RadioButton';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/index.scss';

const AccessibleRadioButtonGroup = (
	{
		name,
		onBlur,
		onChange,
		required,
		fieldData,
		items,
		label,
		ariaLabelledBy,
		radioGroupLabelId,
	}
) => {
	const { error, value } = fieldData;
	const errorId = isEmptyValue(error) ? '' : `${name}Error`;
	const labelId = isEmptyValue(radioGroupLabelId) ? `${name}RadioGroupLabelId` : radioGroupLabelId;

	return (
		<div className={classes.accessibleFormField}>
			<RadioButtonGroup
				items={items}
				required={required}
				radioGroupLabel={label}
				radioGroupLabelId={labelId}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={errorId}
				radioButtonComponent={(item) => {
					return (
						<AccessibleRadioButton
							{...item}
							name={name}
							checked={value === item.value}
							onBlur={onBlur}
							onChange={onChange}
							ariaDescribedBy={errorId}
						/>
					);
				}}
			/>
			{
				error && isEmptyValue(value) && (
					<FieldError
						id={errorId}
						errorMessage={error}
					/>
				)
			}
		</div>
	);
};

export { AccessibleRadioButtonGroup };
