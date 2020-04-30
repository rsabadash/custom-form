import React from 'react';
import classNames from 'classnames';
import classes from './styles/index.scss';

const Checkbox = (
	{
		id,
		name,
		onBlur,
		onChange,
		checked,
		disabled,
		required,
		ariaLabel,
		ariaDescribedBy,
		ariaLabelledBy,
		checkboxClassName,
		customCheckbox
	}
) => {
	const checkboxClassNames = classNames(
		classes.checkbox,
		checkboxClassName
	);

	return (
		<>
			<input
				id={id}
				name={name}
				type="checkbox"
				checked={checked}
				disabled={disabled}
				required={required}
				onBlur={onBlur}
				onChange={onChange}
				aria-label={ariaLabel} // if other description absent
				aria-labelledby={ariaLabelledBy} // which element has label for input
				aria-describedby={ariaDescribedBy} // which element describe input
				className={checkboxClassNames}
			/>
			{
				customCheckbox && (
					customCheckbox({
						checked,
						handleCustomCheckboxClick: () => onChange(null, name, !checked)
					})
				)
			}
		</>
	);
};

export { Checkbox };
