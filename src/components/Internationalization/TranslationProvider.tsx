import React, { useMemo, useCallback } from 'react';
import { useIntl } from 'react-intl';

import {
	TranslationProviderProps,
	TranslationContextAPI,
	TranslationContextState,
	TranslationContextAPIProps,
	TranslationContextStateProps,
	DEFAULT_LOCALE
} from './const';
import { LocalesLanguageEnum } from '../../i18n/locales';

const TranslationProvider: React.FC<TranslationProviderProps> = (
	{
		children,
		locale,
		changeLanguage
	}
) => {
	const { formatMessage } = useIntl();

	const languageUrlPrefix = useMemo(() => {
		return locale === DEFAULT_LOCALE ? '' : `/${LocalesLanguageEnum[locale]}`;
	}, [locale]);

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
			changeLanguage
		};
	}, [
		translate,
		changeLanguage
	]);

	const stateProviderValue = useMemo<TranslationContextStateProps>(() => {
		return {
			languageUrlPrefix
		};
	}, [
		languageUrlPrefix
	]);

	return (
		<TranslationContextAPI.Provider value={apiProviderValue}>
			<TranslationContextState.Provider value={stateProviderValue}>
				{children}
			</TranslationContextState.Provider>
		</TranslationContextAPI.Provider>
	);
};

export { TranslationProvider };
