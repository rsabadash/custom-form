import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import { TranslationProviderProps, TranslationContextAPI, TranslationContextAPIProps } from './const';

const TranslationProvider: React.FC<TranslationProviderProps> = (
	{
		children,
		setLanguage
	}
) => {
	const { formatMessage } = useIntl();

	const translate = useCallback((value, placeholders) => {
		return formatMessage(
			{
				id: value
			},
			placeholders
		);
	}, [formatMessage]);

	const apiProviderValue = useMemo<TranslationContextAPIProps>(() => {
		return {
			translate,
			setLanguage
		};
	}, [
		translate,
		setLanguage
	]);

	return (
		<TranslationContextAPI.Provider value={apiProviderValue}>
			{children}
		</TranslationContextAPI.Provider>
	);
};

export { TranslationProvider };
