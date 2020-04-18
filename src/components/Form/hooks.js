import { useRef, useMemo, useContext, useReducer, useCallback } from 'react';
import { FormContext } from './consts';
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
import { throwError, validateField,	validateAllFields } from './utilities';
import { useEventCallback } from '../../hooks/useEventCallback';
import { isEmptyValue } from '../../utilities/string';
import { isFunction, isNullOrUndefined, } from '../../utilities/type';

export const useFormAPI = () => {
	const context = useContext(FormContext);

	if (context === undefined) {
		throw new Error('useFormAPI must be used within a FormProvider');
	}

	return context
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
			return setFieldError(name, error, dispatch);
		}

		if (isEmptyValue(error) && hasErrorMessage(name)) {
			removeFieldError(name, dispatch);
		}
	}, [hasErrorMessage]);

	const handleBlur = useEventCallback((event) => {
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
	});

	const handleChange = useEventCallback((event) => {
		event.persist();
		const { name, value } = event.target;

		setFieldValueAction(name, value, dispatch);
	});

	const handleSubmit = useEventCallback(async (event) => {
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
	}
};
