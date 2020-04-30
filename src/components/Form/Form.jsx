import React, { useMemo } from 'react';
import { useForm } from './hooks';
import { FormActionsContext, FormStateContext } from './consts';

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
	}, [config]);

	const {
		getValues,
		getErrors,
		resetForm,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldValue,
		getFieldError,
		registerField,
		unregisterField,
		getFieldHandlers,
		registerFieldValidation,
		unregisterFieldValidation
	} = useForm({
		onSubmit,
		formConfig,
		initialValues
	});

	const memoStateValues = useMemo(() => {
		return {
			getValues,
			getErrors,
			getFieldValue,
			getFieldError
		};
	}, [
		getValues,
		getErrors,
		getFieldValue,
		getFieldError
	]);

	const memoActionValues = useMemo(() => {
		return {
			resetForm,
			handleBlur,
			handleChange,
			handleSubmit,
			registerField,
			unregisterField,
			getFieldHandlers,
			registerFieldValidation,
			unregisterFieldValidation
		};
	}, [
		resetForm,
		handleBlur,
		handleChange,
		handleSubmit,
		registerField,
		unregisterField,
		getFieldHandlers,
		registerFieldValidation,
		unregisterFieldValidation
	]);

	return (
		<FormStateContext.Provider value={memoStateValues}>
			<FormActionsContext.Provider value={memoActionValues}>
				<form onSubmit={handleSubmit}>
					{children}
				</form>
			</FormActionsContext.Provider>
		</FormStateContext.Provider>
	);
};

export { Form };
