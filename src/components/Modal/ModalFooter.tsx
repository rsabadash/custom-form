import React from 'react';
import classes from './styles/index.scss';

const ModalFooter: React.FC = (
	{
		children
	}
) => {
	return (
		<div className={classes.modalFooter}>
			{children}
		</div>
	);
};

export { ModalFooter };
