import React from 'react';
import Label from '../Label';
import { TextField } from '../TextField';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/index.scss';

const AccessibleInput = (
	{
		name,
		type,
		label,
		labelId,
		onBlur,
		onChange,
		disabled,
		required,
		fieldData,
		ariaLabel,
		placeholder,
		ariaLabelledBy
	}
) => {
	const { value, error } = fieldData;
	const errorId = isEmptyValue(error) ? '' : `${name}Error`;

	return (
		<div className={classes.accessibleFormField}>
			<Label
				labelId={labelId}
				htmlFor={name}
				labelClassName={classes.accessibleFormField__label}
			>
				{label}
			</Label>
			<TextField
				id={name}
				name={name}
				type={type}
				value={value}
				onBlur={onBlur}
				invalid={!!error}
				onChange={onChange}
				disabled={disabled}
				required={required}
				ariaLabel={ariaLabel}
				placeholder={placeholder}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={errorId}
				inputClassName={classes.accessibleFormField__input}
			/>
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

export { AccessibleInput };
