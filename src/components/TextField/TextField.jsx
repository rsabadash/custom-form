import React from 'react';

const TextField = (
	{
		name,
		type,
		value,
		onBlur,
		onChange,
		invalid,
		disabled,
		required,
		ariaLabel,
		placeholder,
		ariaLabelledBy,
		ariaDescribedBy,
		inputClassName
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
			id={name}
			name={name}
			type={type}
			value={value}
			disabled={disabled}
			required={required}
			onBlur={handleBlur}
			onChange={handleChange}
			aria-required={required} // could be avoidable, but in this case used, cause React doesn't show require attribute and voice doesn't announce that field is required
			aria-label={ariaLabel} // if other description absent
			placeholder={placeholder}
			aria-invalid={invalid} // if value invalid
			aria-labelledby={ariaLabelledBy} // which element has label for input
			aria-describedby={ariaDescribedBy} // which element describe input
			className={inputClassName}
			autoComplete="off"
			data-testid="textField"
		/>
	);
};

TextField.defaultProps = {
	type: 'text',
	name: 'textField'
};

export { TextField };
