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
								onClose={onClose}
								onConfirm={onConfirm}
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