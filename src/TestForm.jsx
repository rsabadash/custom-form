import React from 'react';

import { Field } from './components/Form';
import { Input, Dropdown, Checkbox, RadioButtonGroup } from './components/AccessibleFormField';
import { AccessibleForm } from './components/AccessibleForm';
import { required, minLength } from './utilities/formValidators';

const TestForm = () => {
	const testHandleChange = () => {
		console.log('testHandleChange');
	};

	const dropdownItems = [
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

	const radioItems = [
		{
			value: 'comedy',
			disabled: true,
			label: 'Comedy'
		},
		{
			value: 'historical',
			disabled: false,
			label: 'Historical'
		},
		{
			value: 'fantasy',
			disabled: false,
			label: 'Fantasy'
		}
	];

	return (
		<AccessibleForm
			onSubmit={console.log}
			formTitle="Contacts"
			ariaLabelledBy="testForm"
			initialValues={{
				firstName: 'John',
				agree: true,
				// movieType: 'fantasy'
			}}
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
				required
				name="lastName"
				label="Last name"
				onChange={testHandleChange}
				component={Input}
				validate={[required(), minLength({ minLength: 6 })]}
			/>
			<Field
				required
				placeholder="Select movie"
				label="Movies"
				items={dropdownItems}
				name="movie"
				multiSelect
				component={Dropdown}
				validate={[required()]}
			/>
			<Field
				required
				label="Are you agree?"
				name="agree"
				component={Checkbox}
				validate={[required()]}
			/>
			<Field
				required
				label="Choose movie type"
				name="movieType"
				items={radioItems}
				component={RadioButtonGroup}
				validate={[required()]}
			/>
			<input type="submit" value="Submit" />
		</AccessibleForm>
	);
};

export default TestForm;
