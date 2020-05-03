import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isEmptyValue } from '../../utilities/string';

const Portal = (
	{
		children,
		portalClassName
	}
) => {
	const componentContainerElement = document.createElement('div');
	const portalElement = isEmptyValue(portalClassName) ? document.body : document.querySelector(`.${portalClassName}`);
	
	useEffect(() => {
		portalElement.appendChild(componentContainerElement);
		
		return () => {
			portalElement.removeChild(componentContainerElement);
		};
	}, [
		portalElement,
		portalClassName,
		componentContainerElement
	]);
	
	return ReactDOM.createPortal(children, componentContainerElement);
};

export { Portal };