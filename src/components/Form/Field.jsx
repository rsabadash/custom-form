import React, { useEffect } from 'react';
import { useFormAction } from './Form'

const Field = (
	{
		component,
		...props
	}
) => {
	const {
		getFieldProps,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	} = useFormAction();

	useEffect(() => {
		registerField(props.name);

		if (props.validate) {
			registerFieldValidation(props.name, {
				validate: props.validate,
			});
		}

		return () => {
			unregisterField(props.name);

			if (props.validate) {
				unregisterFieldValidation(props.name);
			}
		};
	}, [
		props.name,
		props.validate,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	]);

	return React.createElement(component, {
		...props,
		...getFieldProps(props.name, props)
	});
};

export { Field };
