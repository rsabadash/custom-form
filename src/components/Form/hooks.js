import { useRef, useMemo, useContext, useReducer, useCallback } from 'react';
import { FormActionsContext, FormStateContext } from './consts';
import { formReducer } from './store/reducer';
import {
	setFieldTouchedAction,
	setFieldValueAction,
	registerFieldAction,
	unregisterFieldAction,
	submitAttemptAction,
	submitSuccessAction,
	submitFailureAction,
	setErrorsAction,
	setFieldErrorAction,
	removeFieldErrorAction,
	resetFormAction
} from './store/actionCreators';
import { throwError, validateField,	validateAllFields } from './utilities';
import { useEventCallback } from '../../hooks/useEventCallback';
import { isEmptyValue } from '../../utilities/string';
import { isFunction, isNullOrUndefined, } from '../../utilities/type';

export const useFormState = () => {
	const context = useContext(FormStateContext);

	if (context === undefined) {
		throw new Error('useFormState must be used within a FormStateProvider');
	}

	return context;
};

export const useFormActions = () => {
	const context = useContext(FormActionsContext);

	if (context === undefined) {
		throw new Error('useFormActions must be used within a FormActionsProvider');
	}

	return context;
};

export const useForm = (
	{
		onSubmit,
		formConfig,
		initialValues = {}
	}
) => {
	if (isNullOrUndefined(onSubmit) || !isFunction(onSubmit)) {
		throwError('You should pass onSubmit function as a prop.');
	}

	const [state, dispatch] = useReducer(formReducer, {
		values: initialValues,
		errors: {},
		touched: {},
		isSubmitting: false
	});

	const fieldValidation = useRef({});

	const initialFormValues = useRef(initialValues);

	const values = useMemo(() => state.values, [state.values]);

	const errors = useMemo(() => state.errors, [state.errors]);

	const getValues = useCallback(() => {
		return values;
	}, [values]);

	const getFieldValue = useCallback((name) => {
		return isNullOrUndefined(values[name]) ? '' : values[name];
	}, [values]);

	const getErrors = useCallback(() => {
		return errors;
	}, [errors]);

	const getFieldError = useCallback((name) => {
		return isNullOrUndefined(errors[name]) ? '' : errors[name];
	}, [errors]);

	// const isValuesChanged = useMemo(() => {}, []); TODO comparison if values were changed.

	const hasErrors = useMemo(() => {
		return Object.values(errors).some((errorMessage) => !isEmptyValue(errorMessage));
	}, [errors]);

	const allowSubmit = useMemo(() => {
		return formConfig.allowSubmitWithError || !hasErrors;
	}, [
		hasErrors,
		formConfig
	]);

	const hasErrorMessage = useCallback((name) => {
		return !isEmptyValue(errors[name]) ? errors[name] : null;
	}, [errors]);

	const isTouched = useCallback((name) => {
		return state.touched[name];
	}, [state.touched]);

	const toggleError = useCallback((error, name) => {
		if (!isEmptyValue(error) && error !== hasErrorMessage(name)) {
			return setFieldErrorAction(name, error, dispatch);
		}

		if (isEmptyValue(error) && hasErrorMessage(name)) {
			removeFieldErrorAction(name, dispatch);
		}
	}, [hasErrorMessage]);

	const submitForm = useEventCallback(async () => {
		submitAttemptAction(dispatch);

		const errorMessages = await validateAllFields(fieldValidation.current, values);

		if (!Object.keys(errorMessages).length) {
			try {
				await onSubmit(values);
				submitSuccessAction(dispatch);
			} catch (error) {
				submitFailureAction(dispatch);
				setErrorsAction(error, dispatch);
			}
		} else {
			submitFailureAction(dispatch);
			setErrorsAction(errorMessages, dispatch);
		}
	});

	const isCheckbox = (type) => {
		return type === 'checkbox';
	};

	const getInputValue = useCallback((target) => {
		let { value, type, name } = target;

		if (isCheckbox(type)) {
			const fieldValue = getFieldValue(name);

			if (typeof fieldValue === 'boolean') {
				value = !fieldValue;
			}
		}

		return value;
	}, [getFieldValue]);

	const handleBlur = useEventCallback((event, name) => {
		let fieldName = name;

		if (event) {
			fieldName = event.target.name;
		}

		if (!isTouched(fieldName)) {
			setFieldTouchedAction(fieldName, true, dispatch);
		}

		if (formConfig.validateOnBlur) {
			validateField(fieldValidation.current, values, fieldName)
				.then((result) => {
					toggleError(result.errorMessage, result.fieldName);
				});
		}
	});

	const handleChange = useEventCallback((event, name, value) => {
		let fieldName = name;
		let fieldValue = value;

		if (event) {
			const inputValue = getInputValue(event.target);

			fieldName = event.target.name;
			fieldValue = inputValue;
		}

		setFieldValueAction(fieldName, fieldValue, dispatch);
	});

	const handleSubmit = useEventCallback((event) => {
		event.preventDefault();

		if (allowSubmit) {
			submitForm();
		}
	});

	const registerField = useCallback((name) => {
		registerFieldAction(name, dispatch);
	}, []);

	const unregisterField = useCallback((name) => {
		unregisterFieldAction(name, dispatch);
	}, []);

	const registerFieldValidation = useCallback((name, { validate }) => {
		if (validate) {
			fieldValidation.current[name] = {
				validate
			};
		}
	}, []);

	const unregisterFieldValidation = useCallback((name) => {
		delete fieldValidation.current[name];
	}, []);

	const resetForm = useCallback(() => {
		resetFormAction(initialFormValues.current, dispatch);
	}, []);

	const getFieldHandlers = useCallback((props) => {
		const { onBlur, onChange } = props;

		return {
			onBlur: (event, name) => {
				event && event.persist();

				handleBlur(event, name);

				if (!isNullOrUndefined(onBlur)) {
					if (isFunction(onBlur)) {
						onBlur(event, name);
					} else {
						throwError('Passed prop onBlur is not a function');
					}
				}
			},
			onChange: (event, name, value) => {
				event && event.persist();

				handleChange(event, name, value);

				if (!isNullOrUndefined(onChange)) {
					if (isFunction(onChange)) {
						onChange(event, name, value);
					} else {
						throwError('Passed prop onChange is not a function');
					}
				}
			}
		};
	}, [
		handleBlur,
		handleChange
	]);

	return {
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
	};
};
