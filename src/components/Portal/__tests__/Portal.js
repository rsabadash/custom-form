import React from 'react';
import { within } from '@testing-library/react';
import { Portal } from '../Portal';
import { renderWithWrapper } from '../../../utilities/renderWithWrapper';

const selectors = {
	testIdForPortalContainer: 'componentForPortal',
	testIdPortalContent: 'portalContent',
	testIdPortalDefault: 'portal',
	testIdPortalCustom: 'portalTest',
	properClassNameForPortalContainer: 'properClassNameForPortalContainer',
	improperClassNameForPortalContainer: 'improperClassNameForPortalContainer'
};

const initDOMElementForPortal = () => {
	const elementForPortal = document.createElement('div');
	elementForPortal.className = selectors.properClassNameForPortalContainer;
	elementForPortal.dataset.testid = selectors.testIdForPortalContainer;

	document.body.appendChild(elementForPortal);

	return elementForPortal;
};

const renderComponent = (props) => {
	return renderWithWrapper(
		<Portal {...props}>
			<div data-testid={selectors.testIdPortalContent}>
				Test content
			</div>
		</Portal>
	);
};

describe('Test Portal component', () => {
	it('Should render portal with content in "body"', () => {
		const { getByTestId } = renderComponent();

		const portal = getByTestId(selectors.testIdPortalDefault);
		const content = getByTestId(selectors.testIdPortalContent);

		expect(portal).toBeInTheDocument();
		expect(content).toBeInTheDocument();
	});

	it('Should render portal with content in "body" if does not find element by passed class', () => {
		const { getByTestId } = renderComponent({
			portalClassName: selectors.improperClassNameForPortalContainer
		});

		const portal = getByTestId(selectors.testIdPortalDefault);
		const content = getByTestId(selectors.testIdPortalContent);

		expect(portal).toBeInTheDocument();
		expect(content).toBeInTheDocument();
	});

	it('Should render portal with content inside defined by passed class element', async () => {
		const elementForPortal = initDOMElementForPortal();

		renderComponent({
			portalClassName: selectors.properClassNameForPortalContainer
		});

		const { getByTestId } = within(elementForPortal);

		const portal = getByTestId(selectors.testIdPortalDefault);

		expect(portal).toBeInTheDocument();
	});

	it('Should remove portal after unmount', () => {
		const { unmount, getByTestId } = renderComponent();

		const portal = getByTestId(selectors.testIdPortalDefault);

		expect(portal).toBeInTheDocument();

		unmount();

		expect(portal).not.toBeInTheDocument();
	});

	it('Should render with passed test id', () => {
		const { getByTestId } = renderComponent({
			testId: selectors.testIdPortalCustom
		});

		const portal = getByTestId(selectors.testIdPortalCustom);

		expect(portal).toBeInTheDocument();
	});
});
