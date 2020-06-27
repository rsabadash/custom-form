import React, { useCallback, useEffect, useRef } from 'react';

type FocusTrapProps = {
	handleFocusOnTopTrap?: () => void;
	handleFocusOnBottomTrap?: () => void;
}

const FocusTrap: React.FC<FocusTrapProps> = (
	{
		children,
		handleFocusOnTopTrap,
		handleFocusOnBottomTrap
	}
) => {
	const focusTrapContainerRef = useRef<null | HTMLDivElement>(null);
	const startTrapRef = useRef<null | HTMLDivElement>(null);
	const endTrapRef = useRef<null | HTMLDivElement>(null);
	const firstFocusableRef = useRef<null | HTMLElement>(null);
	const lastFocusableRef = useRef<null | HTMLElement>(null);

	const getAllFocusableElements = useCallback((): void | NodeListOf<HTMLElement> => {
		if (focusTrapContainerRef.current) {
			return focusTrapContainerRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
		}
	}, []);

	useEffect(() => {
		const focusableElements = getAllFocusableElements();

		if (focusableElements) {
			initFirstLastContentFocusableElements(focusableElements)
				.then((elements) => {
					elements.firstElement.focus();
				});
		}
	}, [getAllFocusableElements]);

	const initFirstLastContentFocusableElements = (focusableElements: NodeListOf<HTMLElement>): Promise<{ firstElement: HTMLElement; lastElement: HTMLElement }> => {
		const firstFocusableItemInContentIndex = 0;
		const lastFocusableItemInContentIndex = focusableElements.length - 1;

		firstFocusableRef.current = focusableElements[firstFocusableItemInContentIndex];
		lastFocusableRef.current = focusableElements[lastFocusableItemInContentIndex];

		return Promise.resolve({
			firstElement: firstFocusableRef.current,
			lastElement: lastFocusableRef.current
		});
	};

	const handleFocus = (event: React.FocusEvent) => {
		const { target } = event;

		if (target === startTrapRef.current) {
			lastFocusableRef.current && lastFocusableRef.current.focus();
			return handleFocusOnTopTrap && handleFocusOnTopTrap();
		}

		if (target === endTrapRef.current) {
			firstFocusableRef.current && firstFocusableRef.current.focus();
			return handleFocusOnBottomTrap && handleFocusOnBottomTrap();
		}
	};

	return (
		<div onFocus={handleFocus}>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
			<div tabIndex={0} ref={startTrapRef}> </div>
			<div ref={focusTrapContainerRef}>
				{children}
			</div>
			{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
			<div tabIndex={0} ref={endTrapRef}> </div>
		</div>
	);
};

export { FocusTrap };
