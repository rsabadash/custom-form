import React from 'react';

const RadioButton = (
	{
		id,
		name,
		value,
		onBlur,
		onChange,
		checked,
		disabled,
		ariaLabel,
		ariaLabelledBy,
		ariaDescribedBy,
		radioButtonClass
	}
) => {
	return (
		<input
			id={id}
			name={name}
			value={value}
			type="radio"
			checked={checked}
			disabled={disabled}
			onBlur={onBlur}
			onChange={onChange}
			aria-label={ariaLabel} // if other description absent
			aria-labelledby={ariaLabelledBy} // which element has label for input
			aria-describedby={ariaDescribedBy} // which element describe input
			className={radioButtonClass}
		/>
	);
};

export { RadioButton };
