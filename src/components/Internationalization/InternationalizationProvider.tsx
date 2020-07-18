import React, { useState, useMemo, useCallback } from 'react';
import { IntlProvider } from 'react-intl';

import translations from '../../i18n/translations';
import { LanguagesType } from '../../i18n/types';
import { flattenMessages, defineUserLocale } from './utils';
import { localStorageManager } from '../../utilities/localStorageManager';
import { TranslationProvider } from './TranslationProvider';
import { InternationalizationProviderProps, DEFAULT_LOCALE, LOCAL_STORAGE_LOCALE_KEY } from './const';

const userLocale = defineUserLocale();

const InternationalizationProvider: React.FC<InternationalizationProviderProps> = (
	{
		children,
		defaultLocale = DEFAULT_LOCALE
	}
) => {
	const [locale, setLocale] = useState<LanguagesType>(userLocale);

	const changeLanguage = useCallback((locale) => {
		setLocale(locale);
		localStorageManager.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);
	}, []);

	const messages = useMemo(() => {
		return flattenMessages(translations[locale]);
	}, [locale]);

	return (
		<IntlProvider
			locale={locale}
			messages={messages}
			defaultLocale={defaultLocale}
		>
			<TranslationProvider changeLanguage={changeLanguage} locale={locale}>
				{children}
			</TranslationProvider>
		</IntlProvider>
	);
};

export { InternationalizationProvider };
