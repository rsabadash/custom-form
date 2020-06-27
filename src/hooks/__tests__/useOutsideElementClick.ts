import { useOutsideElementClick } from '../useOutsideElementClick';
import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

const initHook = (props) => {
	renderHook(useOutsideElementClick, {
		initialProps: props
	});
};

describe('Test useOutsideElementClick hook', () => {
	const element = document.createElement('div');
	const handleOutsideClickMock = jest.fn();

	afterEach(() => {
		handleOutsideClickMock.mockClear();
	});

	it('Should call callback function if dependency is truthy and click was on the document', () => {
		initHook({
			element: element,
			dependency: true,
			handleClick: handleOutsideClickMock
		});

		fireEvent.click(document);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(1);
	});

	it('Should not call callback function if click was on the element', () => {
		initHook({
			element: element,
			dependency: true,
			handleClick: handleOutsideClickMock
		});

		fireEvent.click(element);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);
	});

	it('Should not call callback function if dependency is falsy and click was on the document', () => {
		initHook({
			element: element,
			dependency: false,
			handleClick: handleOutsideClickMock
		});

		fireEvent.click(document);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);
	});

	it('Should throw warning in console if passed inappropriate element', () => {
		const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => null);

		initHook({
			element: null,
			dependency: true,
			handleClick: handleOutsideClickMock
		});

		fireEvent.click(document);

		expect(spyWarn).toHaveBeenCalledTimes(1);
		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);

		spyWarn.mockRestore();
	});

	it('Should throw warning in console if callback function was not passed', () => {
		const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => null);

		initHook({
			element: null,
			dependency: true,
			handleClick: undefined
		});

		fireEvent.click(document);

		expect(spyWarn).toHaveBeenCalledTimes(1);
		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);

		spyWarn.mockRestore();
	});
});
