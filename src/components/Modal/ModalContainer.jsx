import React from 'react';
import { Portal } from '../Portal';
import { Modal } from './Modal';
import { Overlay } from '../Overlay';

const ModalContainer = (
	{
		title,
		isOpen,
		children,
		onClose,
		onConfirm,
		ariaLabelledBy,
		footerComponent
	}
) => {
	return (
		<>
			{
				isOpen && (
					<Portal>
						<Overlay>
							<Modal
								title={title}
								isOpen={isOpen}
								onClose={onClose}
								onConfirm={onConfirm}
								ariaLabelledBy={ariaLabelledBy}
								footerComponent={footerComponent}
							>
								{children}
							</Modal>
						</Overlay>
					</Portal>
				)
			}
		</>
	);
};

export { ModalContainer };
