import React from 'react';
import Form from '../Form';
import { Heading } from '../Heading';
import { AccessibleFormProps } from './types';

const AccessibleForm = <T, >(
	{
		children,
		onSubmit,
		formTitle,
		initialValues,
		ariaLabelledBy
	}: AccessibleFormProps<T>
) => {
	return (
		<div
			role="form"
			aria-labelledby={ariaLabelledBy}
		>
			<Heading
				level={2}
				id={ariaLabelledBy}
			>
				{formTitle}
			</Heading>
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
			>
				{children}
			</Form>
		</div>
	);
};

export { AccessibleForm };
