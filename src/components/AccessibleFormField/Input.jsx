import React, { useEffect } from 'react';
import Label from '../Label';
import { TextField } from '../TextField';
import { isEmptyValue } from '../../utilities/string';

const Input = (
	{
		name,
		type,
		label,
		labelId,
		validate,
		placeholder,
		required,
		ariaLabel,
		ariaLabelledBy,
		ariaDescribedBy,
		...props
	}
) => {
	const customLabelId = !isEmptyValue(labelId) ? labelId : `${name}Label`;
	const labelledBy = !isEmptyValue(ariaLabelledBy) ? ariaLabelledBy : customLabelId;

	useEffect(() => {
		if (customLabelId !== labelledBy) {
			console.warn(`Label attribute id="${customLabelId}" should be the same as attribute aria-labelledby="${labelledBy}" of input.`);
		}
	}, [
		customLabelId,
		labelledBy
	]);

	return (
		<>
			<Label
				labelId={customLabelId}
				htmlFor={name}
			>
				{label}
			</Label>
			<TextField
				id={name}
				name={name}
				type={type}
				validate={validate}
				placeholder={placeholder}
				required={required}
				ariaLabel={ariaLabel}
				ariaLabelledBy={labelledBy}
				ariaDescribedBy={ariaDescribedBy}
				{...props}
			/>
		</>
	);
};

export { Input };
