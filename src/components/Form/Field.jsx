import React, { useEffect } from 'react';
import { useFormAPI } from './hooks';

const Field = (
	{
		component,
		...props
	}
) => {
	const {
		handleBlur,
		handleChange,
		getFieldValue,
		registerField,
		unregisterField,
		registerFieldValidation,
		unregisterFieldValidation
	} = useFormAPI();

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

	const value = getFieldValue(props.name);

	return React.useMemo(() => {
		return React.createElement(component, {
			...props,
			value,
			onBlur: handleBlur,
			onChange: handleChange
		});
	}, [value]);
};

export { Field };
