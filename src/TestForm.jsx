import React from 'react';

import { Field } from './components/Form';
import { Input } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';
import { Dropdown } from './components/DropDown';
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
			<Field
				title="Test dropdown"
				items={items}
				name="dropdown"
				component={Dropdown}
			/>
			<input type="submit" value="Submit" />
		</AccessibleForm>
	);
};

export default TestForm;
