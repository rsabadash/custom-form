import React from 'react';

import { Field } from './components/Form';
import { Input, Dropdown } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';
import { required, minLength } from './utilities/formValidators';

const TestForm = () => {
	const testHandleChange = () => {
		console.log('testHandleChange');
	};

	const items = [
		{
			id: 1,
			value: 'Pulp Fiction'
		},
		{
			id: 2,
			value: 'The Prestige'
		},
		{
			id: 4,
			value: 'Blade Runner 2049'
		}
	];
	
	return (
		<AccessibleForm
			onSubmit={console.log}
			formTitle="Contacts"
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
				onChange={testHandleChange}
				component={Input}
				validate={[required(), minLength({ minLength: 6 })]}
			/>
			<Field
				placeholder="Select movie"
				label="Movies"
				items={items}
				name="movie"
				component={Dropdown}
				validate={[required()]}
			/>
			<input type="submit" value="Submit" />
		</AccessibleForm>
	);
};

export default TestForm;
