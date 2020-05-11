import React from 'react';

const headingLevelEnum = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
	5: 'h5',
	6: 'h6'
};

const Heading = (
	{
		id,
		level,
		testId,
		children,
		classNameHeading
	}
) => {
	const TagName = headingLevelEnum[level];

	return (
		<TagName
			id={id}
			data-testid={testId}
			className={classNameHeading}
		>
			{ children }
		</TagName>
	);
};

Heading.defaultProps = {
	testId: 'heading'
};

export { Heading };
