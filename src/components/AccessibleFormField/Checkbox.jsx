import React from 'react';
import classNames from 'classnames';
import Label from '../Label';
import { Checkbox } from '../Checkbox';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/index.scss';

const AccessibleCheckbox = (
	{
		name,
		label,
		labelId,
		onBlur,
		onChange,
		validate,
		required,
		disabled,
		fieldData,
		ariaLabel,
		ariaLabelledBy
	}
) => {
	const { error, value } = fieldData;
	const errorId = isEmptyValue(error) ? '' : `${name}Error`;

	const checkboxClassNames = classNames(
		classes.accessibleFormField__checkbox,
		classes.accessibleHidden
	);

	return (
		<div className={classes.accessibleFormField}>
			<Checkbox
				id={name}
				name={name}
				onBlur={onBlur}
				onChange={onChange}
				validate={validate}
				checked={value}
				disabled={disabled}
				required={required}
				ariaLabel={ariaLabel}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={errorId}
				checkboxClassName={checkboxClassNames}
			/>
			<Label
				labelId={labelId}
				htmlFor={name}
				labelClassName={classes.accessibleFormField__label}
			>
				{label}
			</Label>
			{
				error && (
					<FieldError
						id={errorId}
						errorMessage={error}
					/>
				)
			}
		</div>
	);
};

export { AccessibleCheckbox };
