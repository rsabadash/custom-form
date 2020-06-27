import React from 'react';
import classes from './styles/index.scss';

const Overlay = (
	{
		children
	}
) => {
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
		<div className={classes.overlay}>
			{children}
		</div>
	);
};

export { Overlay };
