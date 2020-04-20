import { useRef, useCallback, useLayoutEffect } from 'react';

const useEventCallback = (fn) => {
	const ref = useRef(fn);
	
	useLayoutEffect(() => {
		ref.current = fn;
	});
	
	return useCallback((...args) => ref.current.apply(0, args), []);
};

export { useEventCallback };
