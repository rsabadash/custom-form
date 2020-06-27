import React, { useRef, useEffect } from 'react';
import { Heading } from '../Heading';
import classes from './styles/index.scss';
import { useOutsideElementClick } from '../../hooks/useOutsideElementClick';

const Modal = (
	{
		id,
		title,
		isOpen,
		children,
		onClose,
		onConfirm,
		footerComponent,
		ariaLabelledBy,
	}
) => {
	const modalFef = useRef(null);
	const closeButtonFef = useRef(null);
	const startTrapRef = useRef(null);
	const endTrapRef = useRef(null);
	const firstFocusableRef = useRef(null);
	const lastFocusableRef = useRef(null);

	const handleOutsideModalClick = () => {
		onClose();
	};

	useOutsideElementClick({
		element: modalFef.current,
		dependency: isOpen,
		handleClick: handleOutsideModalClick
	});

	useEffect(() => {
		const previousActiveElement = document.activeElement;
		const focusableElements = getAllFocusableElements();

		initFirstLastContentFocusableElements(focusableElements)
			.then((elements) => {
				elements.firstElement.focus();
			});

		return () => {
			previousActiveElement.focus();
		};
	}, []);

	const getAllFocusableElements = () => {
		return modalFef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
	};

	const initFirstLastContentFocusableElements = (focusableElements) => {
		const firstFocusableItemInContentIndex = 2; // Skip start trap and close button
		const lastFocusableItemInContentIndex = focusableElements.length - 2; // Skip end trap

		firstFocusableRef.current = focusableElements[firstFocusableItemInContentIndex];
		lastFocusableRef.current = focusableElements[lastFocusableItemInContentIndex];

		return Promise.resolve({
			firstElement: firstFocusableRef.current,
			lastElement: lastFocusableRef.current
		});
	};

	const handleModalElementsFocus = (event) => {
		const { target } = event;

		if (target === startTrapRef.current) {
			return lastFocusableRef.current.focus();
		}

		if (target === endTrapRef.current) {
			return closeButtonFef.current.focus();
		}
	};

	const handleModalKeyDown = (event) => {
		event.stopPropagation();
		const { key } = event;

		if (key === 'Escape') {
			onClose();
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
		<div
			id={id}
			role="dialog"
			ref={modalFef}
			aria-modal={true}
			aria-labelledby={ariaLabelledBy}
			className={classes.modal}
			onKeyDown={handleModalKeyDown}
			onFocus={handleModalElementsFocus}
		>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
			<div tabIndex={0} ref={startTrapRef}> </div>
			<div className={classes.modalHeader}>
				<Heading
					level={2}
					id={ariaLabelledBy}
				>
					{title}
				</Heading>
				<div className={classes.modalHeaderControlButtons}>
					<button
						type="button"
						onClick={onClose}
						ref={closeButtonFef}
					>
						Close
					</button>
				</div>
			</div>
			<div className={classes.modalBody}>
				{children}
			</div>
			<div className="modalFooter">
				{
					footerComponent
						? footerComponent
						: (
							<>
								<button
									onClick={onConfirm}
								>
									Ok
								</button>
								<button
									onClick={onClose}
								>
									Cancel
								</button>
							</>
						)
				}
			</div>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
			<div tabIndex={0} ref={endTrapRef}> </div>
		</div>
	);
};

export { Modal };
