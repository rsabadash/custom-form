import React, { FC } from 'react';
import classNames from 'classnames';
import { ShadowContainerProps } from './types';
import classes from './styles/index.scss';

const ShadowContainer: FC<ShadowContainerProps> = (
	{
		children,
		shadowContainerClassName
	}
) => {
	const componentClasses = classNames(
		classes.shadowContainer,
		shadowContainerClassName
	);

	return (
		<div className={componentClasses}>
			{children}
		</div>
	);
};

export { ShadowContainer };