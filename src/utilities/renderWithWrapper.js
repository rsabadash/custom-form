import { render } from '@testing-library/react';

export const renderWithWrapper = (ui, options) => {
	const Wrapper = ({ children }) => {
		return (
			children
			// <Proveder>{children}</Proveder>
		);
	};

	return render(ui, {
		wrapper: Wrapper,
		...options
	});
};
