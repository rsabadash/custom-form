import React from 'react';

import Form, { Field } from './components/Form';
import TextField from './components/TextField/TextField';
import { required, minLength } from './utilities/formValidators';

const TestForm = () => {
	const testHandleChange = () => {
		console.log('testHandleChange')
	};

	return (
		<Form onSubmit={console.log} initialValues={{ someName: 'value' }}>
			<h1>Test form</h1>
			<Field
				name="someName"
				onChange={testHandleChange}
				component={TextField}
				validate={[required(), minLength({ minLength: 2 })]}
			/>
			<input type="submit" value="Submit" />
		</Form>
	);
};

export default TestForm;
