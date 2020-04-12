import React, { useMemo, createContext } from 'react';
import { useForm } from './hooks';

const FormStateContext = createContext();
const FormActionContext = createContext();

export const useFormState = () => {
	const context = React.useContext(FormStateContext);

	if (context === undefined) {
		throw new Error('useFormState must be used within a FormProvider');
	}

	return context
};

export const useFormAction = () => {
	const context = React.useContext(FormActionContext);

	if (context === undefined) {
		throw new Error('useFormState must be used within a FormProvider');
	}

	return context
};

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
		state,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldProps,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	} = useForm({
		onSubmit,
		formConfig,
		initialValues
	});

	return (
		<FormStateContext.Provider value={{
			state
		}}>
			<FormActionContext.Provider value={{
				handleBlur,
				handleChange,
				getFieldProps,
				registerField,
				unregisterField,
				registerFieldValidation,
				unregisterFieldValidation
			}}>
				<form onSubmit={handleSubmit}>
					{children}
				</form>
			</FormActionContext.Provider>
		</FormStateContext.Provider>
	);
};

export { Form };
