import React from 'react';

import Form, { Field } from './components/Form';
import { Input } from './components/AccessibleFormField';
import { required, minLength } from './utilities/formValidators';

const TestForm = () => {
	const testHandleChange = () => {
		console.log('testHandleChange');
	};

	return (
		<Form onSubmit={console.log} initialValues={{ firstName: 'John' }}>
			<h1>Test form</h1>
			<Field
				required
				name="firstName"
				label="First name"
				labelId="firstNameLabel"
				placeholder="First name"
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
		</Form>
	);
};

export default TestForm;
