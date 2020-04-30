import React from 'react';

const Label = (
	{
		labelId,
		htmlFor,
		children,
		labelClassName
	}
) => {
	return (
		<label
			id={labelId} // for aria-labelledby
			htmlFor={htmlFor}
			className={labelClassName}
		>
			{children && children}
		</label>
	);
};

export { Label };
