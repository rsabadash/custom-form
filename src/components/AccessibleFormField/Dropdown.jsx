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
	const { value, error } = fieldData;
	const errorId = isEmptyValue(error) ? '' : `${name}Error`;
	const labelledBy = isEmptyValue(ariaLabelledBy) ? name : ariaLabelledBy;
	const idForLabel = isEmptyValue(labelId) ? labelledBy : labelId;

	return (
		<div className={classes.accessibleFormField}>
			<Label
				labelId={idForLabel}
				htmlFor={name}
				labelClassName={classes.accessibleFormField__label}
			>
				{label}
			</Label>
			<Dropdown
				name={name}
				value={value}
				items={items}
				onBlur={onBlur}
				onChange={onChange}
				disabled={disabled}
				required={required}
				ariaLabel={ariaLabel}
				dropdownId={dropdownId}
				placeholder={placeholder}
				multiSelect={multiSelect}
				ariaLabelledBy={labelledBy}
				ariaDescribedBy={errorId}
				dropdownButtonClass={classes.accessibleFormField__dropdown}
				dropdownListClass={classes.accessibleFormField__dropdownList}
				dropdownListItemClass={classes.accessibleFormField__dropdownListItem}
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
