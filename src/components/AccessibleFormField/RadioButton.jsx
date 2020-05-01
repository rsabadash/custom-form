import React from 'react';
import classNames from 'classnames';
import Label from '../Label';
import { RadioButton } from '../RadioButton';
import classes from './styles/index.scss';

const AccessibleRadioButton = (
	{
		name,
		value,
		label,
		labelId,
		onBlur,
		onChange,
		checked,
		disabled,
		ariaLabel,
		ariaLabelledBy,
		ariaDescribedBy
	}
) => {
	const radioButtonClasses = classNames(
		classes.accessibleFormField__radioButton,
		classes.accessibleHidden
	);

	return (
		<div className={classes.accessibleFormField__radioButtonWrapper}>
			<RadioButton
				id={value}
				name={name}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				checked={checked}
				disabled={disabled}
				ariaLabel={ariaLabel}
				ariaLabelledBy={ariaLabelledBy}
				ariaDescribedBy={ariaDescribedBy}
				radioButtonClass={radioButtonClasses}
			/>
			<Label
				labelId={labelId}
				htmlFor={value}
				labelClassName={classes.accessibleFormField__label}
			>
				{label}
			</Label>
		</div>
	);
};

export { AccessibleRadioButton };
