import React from 'react';
import { isEmptyValue } from '../../utilities/string';
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
	if (isEmptyValue(errorMessage)) {
		throw new Error('Passed in FieldError component prop "errorMessage" should not be empty.');
	}

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
