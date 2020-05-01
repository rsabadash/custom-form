import React from 'react';
import classes from './styles/index.scss';

const FieldError = (
	{
		id,
		errorMessage
	}
) => {
	return (
		<div
			id={id}
			role="status"
			aria-live="polite"
			className={classes.fieldError}
		>
			{errorMessage}
		</div>
	);
};

export { FieldError };
