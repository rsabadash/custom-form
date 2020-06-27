import React from 'react';
import { Portal } from '../Portal';
import { ModalContainer } from './ModalContainer';
import { Overlay } from '../Overlay';

const Modal = (
	{
		isOpen,
		children,
		onClose,
		ariaLabelledBy,
	}
) => {
	return (
		<>
			{
				isOpen && (
					<Portal>
						<Overlay>
							<ModalContainer
								isOpen={isOpen}
								onClose={onClose}
								ariaLabelledBy={ariaLabelledBy}
							>
								{children}
							</ModalContainer>
						</Overlay>
					</Portal>
				)
			}
		</>
	);
};

export { Modal };
