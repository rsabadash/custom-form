import React from 'react';
import Form from '../Form';

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
			<h2 id={ariaLabelledBy}>{formTitle}</h2>
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
