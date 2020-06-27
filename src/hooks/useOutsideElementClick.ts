import { useCallback, useEffect } from 'react';
import { isFunction } from '../utilities/type';

type UseOutsideElementClickProps = {
	element: null | HTMLElement;
	dependency: boolean;
	handleClick: () => void;
}

export const useOutsideElementClick = ({ element, dependency, handleClick }: UseOutsideElementClickProps): void => {
	const handleOutsideClick = useCallback((event: MouseEvent): void => {
		if (!element || !(event.target instanceof Node)) {
			console.warn('Passed element is not an element.');
			return;
		}

		if (element.contains(event.target)) {
			return;
		}

		if (!isFunction(handleClick)) {
			console.warn('You should pass callback function.');
			return;
		}

		handleClick();
	}, [
		element,
		handleClick
	]);

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
};
