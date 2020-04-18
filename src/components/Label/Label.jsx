import React from 'react';

const Label = (
	{
		labelId,
		htmlFor,
		children
	}
) => {
	return (
		<label
			id={labelId}
			htmlFor={htmlFor}
		>
			{children && children}
		</label>
	);
};

export { Label };
