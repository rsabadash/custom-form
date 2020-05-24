import React from 'react';

type TextFieldProps = {
	name: string;
	type?: string;
	value: string;
	onBlur?: React.FocusEventHandler;
	onChange?: React.ChangeEventHandler;
	testId?: string;
	invalid?: boolean;
	disabled?: boolean;
	required?: boolean;
	ariaLabel?: string;
	placeholder?: string;
	ariaLabelledBy?: string;
	ariaDescribedBy?: string;
	inputClassName?: string;
};

const TextField: React.FC<TextFieldProps> = (
	{
		name,
		type,
		value,
		onBlur,
		onChange,
		testId,
		invalid,
		disabled,
		required,
		ariaLabel,
		placeholder,
		ariaLabelledBy,
		ariaDescribedBy,
		inputClassName,
	}
) => {
	const handleBlur = (event: React.FocusEvent) => {
		event.persist();
		onBlur && onBlur(event);
	};

	const handleChange = (event: React.ChangeEvent) => {
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
			data-testid={testId}
		/>
	);
};

TextField.defaultProps = {
	type: 'text',
	name: 'textField',
	testId: 'textField'
};

export { TextField };
