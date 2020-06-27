import { useContext, createContext } from 'react';

const modalContextStateDefaults = {
	onClose: () => {
		console.warn('You should implement this method');
	}
};

export type ModalContextProps = {
	onClose: () => void;
	ariaLabelledBy?: string;
}

export const ModalContext = createContext<ModalContextProps>(modalContextStateDefaults);

export const useModalContext = (): never | ModalContextProps => {
	const context = useContext(ModalContext);

	if (context === undefined) {
		throw new Error('useModalContext must be used within a Modal');
	}

	return context;
};
