import { useRef, useCallback, useLayoutEffect } from 'react';

const useEventCallback = (fn) => {
	let ref = useRef(() => {});

	useLayoutEffect(() => {
		ref.current = fn;
	});

	return useCallback((event) => ref.current(event), []);
};

export { useEventCallback };
