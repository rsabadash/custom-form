import { useRef, useMemo, useEffect, useReducer, useCallback } from 'react';
import { formReducer } from './store/reducer';
import {
	setFieldTouchedAction,
	setFieldValueAction,
	registerFieldAction,
	unregisterFieldAction,
	submitAttemptAction,
	submitSuccessAction,
	submitFailureAction,
	setErrors,
	setFieldError,
	removeFieldError
} from './store/actionCreators';
import {
	throwError,
	isFunction,
	isEmptyValue,
	isNullOrUndefined,
	validateField,
	validateAllFields,
} from './utilities';

export const usePrevious = (value) => {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
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

	const values = useMemo(() => state.values, [state.values]);

	const getFieldValue = useCallback((name) => {
		if (!isNullOrUndefined(values[name])) {
			return values[name];
		}

		throwError(`Field wit name ${name} is not defined`);
	}, [values]);

	// const isValuesChanged = useMemo(() => {}, []); TODO comparison if values were changed.

	const hasErrors = useMemo(() => {
		return Object.values(state.errors).some((errorMessage) => !isEmptyValue(errorMessage));
	}, [state.errors]);

	const allowSubmit = useMemo(() => {
		return formConfig.allowSubmitWithError || !hasErrors;
	}, [
		hasErrors,
		formConfig
	]);

	const hasErrorMessage = useCallback((name) => {
		return !isEmptyValue(state.errors[name]) ? state.errors[name] : null;
	}, [state.errors]);

	const isTouched = useCallback((name) => {
		return state.touched[name];
	}, [state.touched]);

	const toggleError = useCallback((error, name) => {
		if (!isEmptyValue(error) && error !== hasErrorMessage(name)) {
			return setFieldError(name, error, dispatch);
		}

		if (isEmptyValue(error) && hasErrorMessage(name)) {
			removeFieldError(name, dispatch);
		}
	}, [hasErrorMessage]);

	const handleBlur = useCallback((event) => {
		event.persist();
		const { name } = event.target;

		if (!isTouched(name)) {
			setFieldTouchedAction(name, true, dispatch)
		}

		if (formConfig.validateOnBlur) {
			validateField(fieldValidation.current, values, name)
			.then((result) => {
				toggleError(result.errorMessage, result.fieldName);
			});
		}
	}, [
		values,
		isTouched,
		toggleError,
		validateField
	]);

	const handleChange = useCallback((event) => {
		event.persist();
		const { name, value } = event.target;

		setFieldValueAction(name, value, dispatch);
	}, []);

	const handleSubmit = useCallback(async (event) => {
		event.preventDefault();

		if (!allowSubmit) return;

		submitAttemptAction(dispatch);

		const errorMessages = await validateAllFields(fieldValidation.current, values);

		if (!Object.keys(errorMessages).length) {
			try {
				await onSubmit(values);
				submitSuccessAction(dispatch);
			} catch (error) {
				submitFailureAction(dispatch);
				setErrors(error, dispatch)
			}
		} else {
			submitFailureAction(dispatch);
			setErrors(errorMessages, dispatch)
		}
	}, [
		values,
		allowSubmit
	]);

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

	const getFieldProps = useCallback((name, props) => {
		const { onBlur, onChange } = props;
		return {
			name,
			value: getFieldValue(name),
			onBlur: (event) => {
				handleBlur(event);

				if (!isNullOrUndefined(onBlur)) {
					if (isFunction(onBlur)) {
						onBlur(event);
					} else {
						throwError('Passed prop onBlur is not a function');
					}
				}
			},
			onChange: (event) => {
				handleChange(event);

				if (!isNullOrUndefined(onChange)) {
					if (isFunction(onChange)) {
						onChange(event);
					} else {
						throwError('Passed prop onChange is not a function');
					}
				}
			}
		}
	}, [
		values,
		handleBlur,
		handleChange,
		getFieldValue
	]);

	console.log(state);

	return {
		state,
		handleBlur,
		handleChange,
		handleSubmit,
		getFieldProps,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	}
};
