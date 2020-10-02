import React, { useEffect } from 'react';
import { useFormActions, useFormState } from './hooks';

const Field = (
	{
		component,
		...props
	}
) => {
	const {
		registerField,
		unregisterField,
		getFieldHandlers,
		registerFieldValidation,
		unregisterFieldValidation
	} = useFormActions();

	const {
		getFieldValue,
		getFieldError
	} = useFormState();

	useEffect(() => {
		registerField(props.name);

		return () => {
			unregisterField(props.name);
		};
	}, [
		props.name,
		registerField,
		unregisterField
	]);

	useEffect(() => {
		if (props.validate) {
			registerFieldValidation(props.name, {
				validate: props.validate,
			});
		}

		return () => {
			if (props.validate) {
				unregisterFieldValidation(props.name);
			}
		};
	}, [
		props.name,
		props.validate,
		registerFieldValidation,
		unregisterFieldValidation
	]);

	const value = getFieldValue(props.name);
	const error = getFieldError(props.name);
	// Field.displayName = 'TEST';
	return React.useMemo(() => {
		return React.createElement(component, {
			...props,
			...getFieldHandlers(props),
			fieldData: {
				value,
				error
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		value,
		error,
		component,
		props.label,
		getFieldHandlers
	]);
};

export { Field };
