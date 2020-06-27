import React from 'react';
import classes from './styles/index.scss';

const ModalContent: React.FC = (
	{
		children
	}
) => {
	return (
		<div className={classes.modalBody}>
			{children}
		</div>
	);
};

export { ModalContent };
