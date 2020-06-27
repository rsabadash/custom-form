import { useOutsideElementClick } from '../useOutsideElementClick';
import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

const initHook = (props) => {
	return renderHook(useOutsideElementClick, {
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
		const { result } = initHook({
			dependency: true,
			handleClick: handleOutsideClickMock
		});
		result.current.setCurrentElement(element);

		fireEvent.click(document);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(1);
	});

	it('Should not call callback function if click was on the element', () => {
		const { result } = initHook({
			dependency: true,
			handleClick: handleOutsideClickMock
		});
		result.current.setCurrentElement(element);

		fireEvent.click(element);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);
	});

	it('Should not call callback function if dependency is falsy and click was on the document', () => {
		const { result } = initHook({
			dependency: false,
			handleClick: handleOutsideClickMock
		});
		result.current.setCurrentElement(element);

		fireEvent.click(document);

		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);
	});

	it('Should throw warning in console if passed inappropriate element', () => {
		const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => null);

		const { result } = initHook({
			dependency: true,
			handleClick: handleOutsideClickMock
		});
		result.current.setCurrentElement(null);

		fireEvent.click(document);

		expect(spyWarn).toHaveBeenCalledTimes(1);
		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);

		spyWarn.mockRestore();
	});

	it('Should throw warning in console if callback function was not passed', () => {
		const spyWarn = jest.spyOn(console, 'warn').mockImplementation(() => null);

		const { result } = initHook({
			dependency: true,
			handleClick: undefined
		});
		result.current.setCurrentElement(null);

		fireEvent.click(document);

		expect(spyWarn).toHaveBeenCalledTimes(1);
		expect(handleOutsideClickMock).toHaveBeenCalledTimes(0);

		spyWarn.mockRestore();
	});
});
