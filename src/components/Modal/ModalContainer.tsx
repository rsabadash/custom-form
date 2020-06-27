import React, { useRef, useEffect, useMemo } from 'react';

import { FocusTrap } from '../FocusTrap';
import { useOutsideElementClick } from '../../hooks/useOutsideElementClick';
import { ModalContext } from './const';
import classes from './styles/index.scss';

type ModalContainerProps = {
	id?: string;
	isOpen: boolean;
	onClose: () => void;
	ariaLabelledBy?: string;
};

const ModalContainer: React.FC<ModalContainerProps> = (
	{
		id,
		isOpen,
		children,
		onClose,
		ariaLabelledBy
	}
) => {
	const modalFef = useRef<null | HTMLDivElement>(null);

	const handleOutsideModalClick = (): void => {
		onClose();
	};

	const { setCurrentElement } = useOutsideElementClick({
		dependency: isOpen,
		handleClick: handleOutsideModalClick
	});

	useEffect(() => {
		const previousActiveElement = document.activeElement as HTMLElement;

		return () => {
			previousActiveElement && previousActiveElement.focus();
		};
	}, []);

	useEffect(() => {
		if (modalFef.current) {
			setCurrentElement(modalFef.current);
		}
	}, [setCurrentElement]);

	const handleModalKeyDown = (event: React.KeyboardEvent) => {
		event.stopPropagation();
		const { key } = event;

		if (key === 'Escape') {
			onClose();
		}
	};

	const providerValue = useMemo(() => {
		return {
			onClose,
			ariaLabelledBy
		};
	}, [
		onClose,
		ariaLabelledBy
	]);

	return (
		<FocusTrap>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
			<div
				id={id}
				role="dialog"
				ref={modalFef}
				aria-modal={true}
				aria-labelledby={ariaLabelledBy}
				className={classes.modal}
				onKeyDown={handleModalKeyDown}
			>
				<ModalContext.Provider value={providerValue}>
					{children}
				</ModalContext.Provider>
			</div>
		</FocusTrap>
	);
};

export { ModalContainer };
