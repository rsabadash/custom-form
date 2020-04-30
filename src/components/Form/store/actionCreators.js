import { actions } from './consts';

export const setFieldTouchedAction = (fieldName, value, dispatch) => {
	dispatch({
		type: actions.SET_FIELD_TOUCHED,
		payload: {
			[fieldName]: value
		}
	});
};

export const setFieldValueAction = (fieldName, value, dispatch) => {
	dispatch({
		type: actions.SET_FIELD_VALUE,
		payload: {
			[fieldName]: value
		}
	});
};

export const registerFieldAction = (fieldName, dispatch) => {
	dispatch({
		type: actions.REGISTER_FIELD,
		payload: fieldName
	});
};

export const unregisterFieldAction = (fieldName, dispatch) => {
	dispatch({
		type: actions.UNREGISTER_FIELD,
		payload: fieldName
	});
};

export const submitAttemptAction = (dispatch) => {
	dispatch({
		type: actions.SUBMIT_ATTEMPT
	});
};

export const submitSuccessAction = (dispatch) => {
	dispatch({
		type: actions.SUBMIT_SUCCESS
	});
};

export const submitFailureAction = (dispatch) => {
	dispatch({
		type: actions.SUBMIT_FAILURE
	});
};

export const setErrorsAction = (errors, dispatch) => {
	dispatch({
		type: actions.SET_ERRORS,
		payload: errors
	});
};

export const setFieldErrorAction = (fieldName, error, dispatch) => {
	dispatch({
		type: actions.SET_FIELD_ERROR,
		payload: {
			[fieldName]: error
		}
	});
};

export const removeFieldErrorAction = (fieldName, dispatch) => {
	dispatch({
		type: actions.REMOVE_FIELD_ERROR,
		payload: fieldName
	});
};

export const resetFormAction = (initialValues, dispatch) => {
	dispatch({
		type: actions.RESET_FORM,
		payload: {
			initialValues
		}
	});
};
