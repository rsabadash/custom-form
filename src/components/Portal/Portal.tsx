import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { isEmptyValue } from '../../utilities/string';

type PortalProps = {
	testId?: string;
	portalClassName?: string;
}

const Portal: React.FC<PortalProps> = (
	{
		testId,
		children,
		portalClassName
	}
) => {
	const componentContainerElement = document.createElement('div');
	componentContainerElement.dataset.testid = testId;

	const portalElement = isEmptyValue(portalClassName)
		? document.body
		: document.querySelector(`.${portalClassName}`);

	useEffect(() => {
		if (portalElement) {
			portalElement.appendChild(componentContainerElement);
		} else {
			document.body.appendChild(componentContainerElement);
		}

		return () => {
			if (portalElement) {
				portalElement.removeChild(componentContainerElement);
			} else {
				document.body.removeChild(componentContainerElement);
			}
		};
	}, [
		portalElement,
		portalClassName,
		componentContainerElement
	]);

	return ReactDOM.createPortal(children, componentContainerElement);
};

Portal.defaultProps = {
	testId: 'portal'
};

export { Portal };
