import React from 'react';

const FieldError = (
	{
		id,
		errorMessage
	}
) => {
	return (
		<span
			id={id}
			role="status"
			aria-live="polite"
		>
			{errorMessage}
		</span>
	);
};

export { FieldError };
