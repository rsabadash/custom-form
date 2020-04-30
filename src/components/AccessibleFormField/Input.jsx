import React from 'react';
import Label from '../Label';
import { TextField } from '../TextField';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';

const AccessibleInput = (
	{
		name,
		type,
		label,
		labelId,
		onBlur,
		onChange,
		validate,
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
		<div>
			<Label
				labelId={labelId}
				htmlFor={name}
			>
				{label}
			</Label>
			<TextField
				id={name}
				name={name}
				type={type}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				validate={validate}
				required={required}
				ariaLabel={ariaLabel}
				placeholder={placeholder}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={errorId}
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
