import React from 'react';

const TextField = (
	{
		name,
		type,
		value,
		onBlur,
		onChange,
		required,
		placeholder
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
			onBlur={handleBlur}
			onChange={handleChange}
			placeholder={required ? `${placeholder}*` : placeholder }
			autoComplete="off"
		/>
	)
};

export default TextField;
