import React from 'react';
import classes from './styles/index.scss';

type FieldErrorProps = {
	id?: string;
	testId?: string;
	errorMessage: string;
}

const FieldError: React.FC<FieldErrorProps> = (
	{
		id,
		testId,
		errorMessage
	}
) => {
	return (
		<div
			id={id}
			role="status"
			aria-live="polite"
			data-testid={testId}
			className={classes.fieldError}
		>
			{errorMessage}
		</div>
	);
};

FieldError.defaultProps = {
	testId: 'fieldError'
};

export { FieldError };
