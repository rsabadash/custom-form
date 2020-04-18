import React, { useMemo } from 'react';
import { useForm } from './hooks';
import { FormContext } from './consts';

const Form = (
	{
		config,
		children,
		onSubmit,
		initialValues
	}
) => {
	const formConfig = useMemo(() => {
		return {
			validateOnBlur: true,
			allowSubmitWithError: true,
			...config
		};
	}, []);

	const {
		getValues,
		getErrors,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldValue,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	} = useForm({
		onSubmit,
		formConfig,
		initialValues
	});

	const memoValues = useMemo(() => {
		return {
			getValues,
			getErrors,
			handleBlur,
			handleChange,
			handleSubmit,
			getFieldValue,
			registerField,
			unregisterField,
			registerFieldValidation,
			unregisterFieldValidation
		};
	}, [
		getValues,
		getErrors,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldValue,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	]);

	return (
		<FormContext.Provider value={memoValues}>
			<form onSubmit={handleSubmit}>
				{children}
			</form>
		</FormContext.Provider>
	);
};

export { Form };
