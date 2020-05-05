import React, { useRef, useEffect } from 'react';

const Modal = (
	{
		id,
		title,
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
			aria-modal
			aria-labelledby={ariaLabelledBy}
			className="modal"
			onKeyDown={handleModalKeyDown}
			onFocus={handleModalElementsFocus}
		>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
			<div tabIndex={0} ref={startTrapRef}> </div>
			<div className="modalHeader">
				<h2 id={ariaLabelledBy}>{title}</h2>
				<button
					type="button"
					onClick={onClose}
					ref={closeButtonFef}
				>
					Close
				</button>
			</div>
			<div className="modalBody">
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
