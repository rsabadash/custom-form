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
	const handleBlur = (event) => {
		event.persist();
		onBlur && onBlur(event);
	};

	const handleChange = (event) => {
		event.persist();
		onChange && onChange(event);
	};

	return (
		<input
			id={id}
			name={name}
			value={value}
			type="radio"
			checked={checked}
			disabled={disabled}
			onBlur={handleBlur}
			onChange={handleChange}
			aria-label={ariaLabel} // if other description absent
			aria-labelledby={ariaLabelledBy} // which element has label for input
			aria-describedby={ariaDescribedBy} // which element describe input
			className={radioButtonClass}
			data-testid="radioButton"
		/>
	);
};

RadioButton.defaultProps = {
	name: 'radioButton'
};

export { RadioButton };
