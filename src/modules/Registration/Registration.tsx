import React from 'react';
import { Field } from '../../components/Form';
import { Input } from '../../components/AccessibleFormField';
import { AccessibleForm } from '../../components/AccessibleForm';
import { useTranslationAPI } from '../../components/Internationalization/const';
import { RegistrationFormValues } from './types';
import {
	FormFieldNames,
	ariaLabelledByRegistrationForm
} from './const';


const Registration = () => {
	const { translate } = useTranslationAPI();

	const handleFormSubmit = (values: RegistrationFormValues) => {
		console.log(values);
	};

	return (
		<AccessibleForm<RegistrationFormValues>
			onSubmit={handleFormSubmit}
			formTitle={translate('common.createAccount')}
			ariaLabelledBy={ariaLabelledByRegistrationForm}
		>
			<Field
				name={FormFieldNames.email}
				label={translate('common.email')}
				component={Input}
			/>
			<Field
				name={FormFieldNames.password}
				label={translate('common.password')}
				component={Input}
			/>
		</AccessibleForm>
	);
};

export { Registration };
