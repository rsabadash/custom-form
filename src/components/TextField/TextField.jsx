import React from 'react';

const TextField = (
	{
		name,
		type,
		value,
		onBlur,
		onChange,
		required,
		placeholder,

		ariaLabel,
		ariaLabelledBy,
		ariaDescribedBy
	}
) => {
	const handleBlur = event => {
		event.persist();
		onBlur(event);
	};

	const handleChange = (event) => {
		event.persist();
		onChange(event);
	};

	return (
		<input
			id={name}
			name={name}
			type={type}
			value={value}
			placeholder={required ? `${placeholder}*` : placeholder }

			required={required}
			aria-required={required}
			aria-label={ariaLabel} // if other description absent
			aria-labelledby={ariaLabelledBy} // which element has label for input
			aria-describedby={ariaDescribedBy} // which element describe input

			onBlur={handleBlur}
			onChange={handleChange}
			autoComplete="off"
		/>
	)
};

TextField.defaultValue = {
	type: 'text'
};

export { TextField };
