import React from 'react';

import { Heading } from '../Heading';
import { useModalContext } from './const';
import classes from './styles/index.scss';

const ModalHeader: React.FC = (
	{
		children
	}
) => {
	const { onClose, ariaLabelledBy } = useModalContext();

	return (
		<div className={classes.modalHeader}>
			<Heading
				level={2}
				id={ariaLabelledBy}
			>
				{children}
			</Heading>
			<div className={classes.modalHeaderControlButtons}>
				<button
					type="button"
					onClick={onClose}
				>
					Close
				</button>
			</div>
		</div>
	);
};

export { ModalHeader };
