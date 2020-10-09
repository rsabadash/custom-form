import { useState, useCallback, useEffect } from 'react';
import { localStorageManager } from '../utilities/localStorageManager';

const useLocalState = <ValueType>(key: string, defaultValue?: ValueType, config?: { listenStorage: boolean }): [ValueType | undefined, (newValue: ValueType) => void] => {
	const listenStorage = config?.listenStorage;

	const [value, setValue] = useState(() => {
		const storedValue = localStorageManager.getItem<ValueType>(key);
		return storedValue === null ? defaultValue : storedValue;
	});

	useEffect(() => {
		const listener = (event) => {
			if (event.storage === localStorage && event.key === key) {
				setValue(JSON.parse(event.newValue));
			}
		};

		if (listenStorage) {
			window.addEventListener('storage', listener);
		}

		return () => {
			if (listenStorage) {
				window.removeEventListener('storage', listener);
			}
		};
	}, [key, listenStorage]);

	const setValueInLocalStorage = useCallback((newValue: ValueType) => {
		setValue(() => {
			localStorageManager.setItem<ValueType>(key, newValue);
			return newValue;
		});
	}, [key]);

	return [value, setValueInLocalStorage];
};

export { useLocalState };