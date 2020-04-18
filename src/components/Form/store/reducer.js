import { actions} from './consts';

export const formReducer = (state, action) => {
	console.log(action.type);
	switch (action.type) {
		case actions.SET_FIELD_VALUE:
			return {
				...state,
				values: {
					...state.values,
					...action.payload
				}
			};
		case actions.SET_FIELD_TOUCHED:
			return {
				...state,
				touched: {
					...state.touched,
					...action.payload
				}
			};
		case actions.SUBMIT_ATTEMPT:
			return {
				...state,
				isSubmitting: true,
				// touched: setNestedTouch
			};
		case actions.SUBMIT_SUCCESS:
			return {
				...state,
				isSubmitting: false
			};
		case actions.SUBMIT_FAILURE:
			return {
				...state,
				isSubmitting: false
			};
		case actions.REGISTER_FIELD:
			return {
				...state,
				values: {
					...state.values,
					[action.payload]: state.values[action.payload] || ''
				}
			};
		case actions.UNREGISTER_FIELD:
			const copiedStateValues = { ...state.values };

			delete copiedStateValues.values[action.payload];

			return {
				...state,
				values: {
					...copiedStateValues
				}
			};
		case actions.SET_ERRORS:
			return {
				...state,
				errors: {
					...state.errors,
					...action.payload
				}
			};
		case actions.SET_FIELD_ERROR:
			return {
				...state,
				errors: {
					...state.errors,
					...action.payload
				}
			};
		case actions.REMOVE_FIELD_ERROR:
			return {
				...state,
				errors: {
					...state.errors,
					[action.payload]: ''
				}
			};
		case action.RESET_FORM:
			return {
				...state,
				values: {
					...action.payload.initialValues
				},
				errors: {},
				touched: {},
				isSubmitting: false
			};
		default:
			return state;
	}
};
