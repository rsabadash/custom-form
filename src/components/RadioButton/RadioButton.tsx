import React from 'react';

type RadioButtonProps = {
	id: string;
	name: string;
	value: string;
	onBlur?: React.FocusEventHandler;
	onChange?: React.ChangeEventHandler;
	checked: boolean;
	disabled?: boolean;
	ariaLabel?: string;
	ariaLabelledBy?: string;
	ariaDescribedBy?: string;
	radioButtonClass?: string;
};

const RadioButton: React.FC<RadioButtonProps> = (
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
