import { useCallback, useEffect, useRef } from 'react';
import { isFunction } from '../utilities/type';

type UseOutsideElementClickProps = {
	dependency: boolean;
	handleClick: () => void;
};

type ReturnType = {
	setCurrentElement: (element: null | HTMLElement) => void;
};

export const useOutsideElementClick = ({ dependency, handleClick }: UseOutsideElementClickProps): ReturnType => {
	const currentElement = useRef<null | HTMLElement>(null);

	const setCurrentElement = useCallback((element: null | HTMLElement) => {
		currentElement.current = element;
	}, []);

	const handleOutsideClick = useCallback((event: MouseEvent): void => {
		if (!currentElement.current || !(currentElement.current instanceof Node)) {
			console.warn('Passed element is not a Node.');
			return;
		}

		if (event.target instanceof Node && currentElement.current.contains(event.target)) {
			return;
		}

		if (!isFunction(handleClick)) {
			console.warn('You should pass callback function.');
			return;
		}

		handleClick();
	}, [handleClick]);

	useEffect(() => {
		if (dependency) {
			document.addEventListener('click', handleOutsideClick);
		}

		return () => {
			if (dependency) {
				document.removeEventListener('click', handleOutsideClick);
			}
		};
	}, [
		dependency,
		handleOutsideClick
	]);

	return {
		setCurrentElement
	};
};
