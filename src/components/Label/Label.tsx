import React from 'react';

type LabelProps = {
	labelId?: string;
	htmlFor?: string;
	testId?: string;
	labelClassName?: string;
}

const Label: React.FC<LabelProps> = (
	{
		labelId,
		htmlFor,
		testId,
		children,
		labelClassName
	}
) => {
	return (
		<label
			id={labelId} // for aria-labelledby
			htmlFor={htmlFor}
			data-testid={testId}
			className={labelClassName}
		>
			{children && children}
		</label>
	);
};

Label.defaultProps = {
	testId: 'label'
};

export { Label };
