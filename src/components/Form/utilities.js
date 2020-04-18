export const validateField = (rules, values, fieldName) => {
	if (rules[fieldName] && rules[fieldName].validate) {
		const fieldValue = values[fieldName];

		for (const validation of rules[fieldName].validate) {
			const hasErrorMessage = validation(fieldValue);

			if (hasErrorMessage) {
				return Promise.resolve({
					fieldName,
					errorMessage: hasErrorMessage,
				});
			}
		}
	}

	return Promise.resolve({
		fieldName,
		errorMessage: '',
	});
};

export const validateAllFields = async (rules, values) => {
	const errors = {};
	const fieldNames = Object.keys(values);

	for (const name of fieldNames) {
		const result = await validateField(rules, values, name);

		if (!isEmptyValue(result.errorMessage)) {
			errors[result.fieldName] = result.errorMessage;
		}
	}

	return errors;
};

export const throwError = (error) => {
	throw new Error(error);
};
