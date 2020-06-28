import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

import translations from '../../i18n/translations';
import { LanguagesType } from '../../i18n/locales';
import { flattenMessages, defineUserLocale } from './utils';
import { localStorageManager } from '../../utilities/localStorageManager';
import { TranslationProvider } from './TranslationProvider';
import { InternationalizationProviderProps, DEFAULT_LOCALE, LOCAL_STORAGE_LOCALE_KEY } from './const';

const InternationalizationProvider: React.FC<InternationalizationProviderProps> = (
	{
		children,
		defaultLocale = DEFAULT_LOCALE
	}
) => {
	const [language, setLanguage] = useState<LanguagesType>(defaultLocale);

	useEffect(() => {
		const userLocale = defineUserLocale(defaultLocale);
		setLanguage(userLocale);
	}, [defaultLocale]);

	const changeLanguage = useCallback((locale) => {
		setLanguage(locale);
		localStorageManager.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);
	}, []);

	const messages = useMemo(() => {
		return flattenMessages(translations[language]);
	}, [language]);

	return (
		<IntlProvider
			locale={language}
			messages={messages}
			defaultLocale={defaultLocale}
		>
			<TranslationProvider setLanguage={changeLanguage}>
				{children}
			</TranslationProvider>
		</IntlProvider>
	);
};

export { InternationalizationProvider };
