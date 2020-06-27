import React from 'react';
import classNames from 'classnames';
import classes from './styles/index.scss';

const headingLevelEnum = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
	5: 'h5',
	6: 'h6'
};

type HeadingProps = {
	id?: string;
	level: number;
	testId?: string;
	classNameHeading?: string;
};

const Heading: React.FC<HeadingProps> = (
	{
		id,
		level,
		testId,
		children,
		classNameHeading
	}
) => {
	const headingClasses = classNames(
		classes.heading,
		classNameHeading
	);

	const TagName = headingLevelEnum[level];

	return (
		<TagName
			id={id}
			data-testid={testId}
			className={headingClasses}
		>
			{ children }
		</TagName>
	);
};

Heading.defaultProps = {
	testId: 'heading'
};

export { Heading };
