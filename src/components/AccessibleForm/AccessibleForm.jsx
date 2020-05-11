import React from 'react';
import Form from '../Form';
import { Heading } from '../Heading';

const AccessibleForm = (
	{
		children,
		onSubmit,
		formTitle,
		initialValues,
		ariaLabelledBy
	}
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
