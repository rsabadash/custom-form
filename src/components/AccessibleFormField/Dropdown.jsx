import React from 'react';
import Label from '../Label';
import { Dropdown } from '../Dropdown';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';

const AccessibleDropdown = (
	{
		name,
		items,
		label,
		labelId,
		onBlur,
		onChange,
		validate,
		required,
		fieldData,
		ariaLabel,
		dropdownId,
		multiSelect,
		placeholder,
		ariaLabelledBy,
	}
) => {
	const { error } = fieldData;
	const errorId = isEmptyValue(error) ? '' : `${name}Error`;
	
	return (
		<div>
			<Label
				labelId={labelId}
				htmlFor={name}
			>
				{label}
			</Label>
			<Dropdown
				id={name}
				name={name}
				items={items}
				onBlur={onBlur}
				onChange={onChange}
				validate={validate}
				required={required}
				ariaLabel={ariaLabel}
				dropdownId={dropdownId}
				placeholder={placeholder}
				multiSelect={multiSelect}
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

export { AccessibleDropdown };
