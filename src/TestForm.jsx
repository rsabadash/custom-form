import React from 'react';

import { Field } from './components/Form';
import { Input } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';
import { required, minLength } from './utilities/formValidators';

const TestForm = () => {
	const testHandleChange = () => {
		console.log('testHandleChange');
	};

	return (
		<AccessibleForm
			onSubmit={console.log}
			formTitle="Test form"
			ariaLabelledBy="testForm"
			initialValues={{ firstName: 'John' }}
		>
			<Field
				required
				name="firstName"
				label="First name"
				onChange={testHandleChange}
				component={Input}
				validate={[required(), minLength({ minLength: 2 })]}
			/>
			<Field
				name="lastName"
				label="Last name"
				ariaLabelledBy="Test"
				onChange={testHandleChange}
				component={Input}
				validate={[required(), minLength({ minLength: 6 })]}
			/>
			<input type="submit" value="Submit" />
		</AccessibleForm>
	);
};

export default TestForm;
