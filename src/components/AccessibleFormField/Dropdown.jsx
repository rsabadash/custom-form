import React from 'react';
import Label from '../Label';
import { Dropdown } from '../Dropdown';
import { FieldError } from '../FieldError';
import { isEmptyValue } from '../../utilities/string';
import classes from './styles/index.scss';

const AccessibleDropdown = (
	{
		name,
		items,
		label,
		labelId,
		onBlur,
		onChange,
		validate,
		disabled,
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
				disabled={disabled}
				required={required}
				ariaLabel={ariaLabel}
				dropdownId={dropdownId}
				placeholder={placeholder}
				multiSelect={multiSelect}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={errorId}
				dropdownButtonClassName={classes.accessibleFormField__dropdown}
				dropdownListClassName={classes.accessibleFormField__dropdownList}
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
