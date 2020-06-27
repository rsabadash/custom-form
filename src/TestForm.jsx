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
			id: 148,
			value: 'Pulp Fiction'
		},
		{
			id: 222,
			value: 'The Prestige'
		},
		{
			id: 49,
			value: 'Blade Runner 2049'
		},
		{
			id: 59,
			value: 'Pulp Fiction'
		},
		{
			id: 64,
			value: 'The Prestige'
		},
		{
			id: 84,
			value: 'Blade Runner 2049'
		},
		{
			id: 114,
			value: 'Pulp Fiction'
		},
		{
			id: 221,
			value: 'The Prestige'
		},
		{
			id: 242,
			value: 'Blade Runner 2049'
		},
		{
			id: 512,
			value: 'Pulp Fiction'
		},
		{
			id: 621,
			value: 'The Prestige'
		},
		{
			id: 181,
			value: 'Blade Runner 2049'
		},
		{
			id: 344,
			value: 'The Prestige'
		},
		{
			id: 356,
			value: 'Blade Runner 2049'
		},
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
		},
		{
			id: 5,
			value: 'Pulp Fiction'
		},
		{
			id: 6,
			value: 'The Prestige'
		},
		{
			id: 8,
			value: 'Blade Runner 2049'
		},
		{
			id: 11,
			value: 'Pulp Fiction'
		},
		{
			id: 21,
			value: 'The Prestige'
		},
		{
			id: 24,
			value: 'Blade Runner 2049'
		},
		{
			id: 52,
			value: 'Pulp Fiction'
		},
		{
			id: 62,
			value: 'The Prestige'
		},
		{
			id: 18,
			value: 'Blade Runner 2049'
		},
		{
			id: 34,
			value: 'The Prestige'
		},
		{
			id: 56,
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
				movie: [148]
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

export { TestForm };
