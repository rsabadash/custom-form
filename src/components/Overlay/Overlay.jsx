import React from 'react';
import classes from './styles/index.scss';

const Overlay = (
	{
		children,
		// handleCloseContent
	}
) => {
	// const handleClick = () => {
	// 	handleCloseContent();
	// };
	//
	// const handleKeyDown = (event) => {
	// 	const { key } = event;
	//
	// 	if ((key === 'Escape')) {
	// 		handleCloseContent();
	// 	}
	// };
	
	return (
		<div className={classes.overlay}>
			{children}
		</div>
	);
};

export { Overlay };
