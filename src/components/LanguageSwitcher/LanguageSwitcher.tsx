import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { LanguagesType } from '../../i18n/types';
import { LOCALES, LocalesLanguageEnum, SUPPORTED_LANGUAGES } from '../../i18n/locales';
import { DEFAULT_LOCALE, useTranslationAPI, useTranslationState } from '../Internationalization/const';
import { Button } from '../Button';
import { Heading } from '../Heading';

const LanguageSwitcher: React.FC = () => {
	const { translate, changeLanguage } = useTranslationAPI();
	const { languageUrlPrefix } = useTranslationState();
	const { push } = useHistory();
	const { pathname } = useLocation();

	const handleClick = (locale: LanguagesType): void => {
		const newLanguageBasedOnLocale = LocalesLanguageEnum[locale];
		const newLanguageUrlPrefix = locale === DEFAULT_LOCALE ? '/' : `/${newLanguageBasedOnLocale}`;
		const currentLanguageUrlPrefix = pathname.split('/')[1] || '/';

		if (currentLanguageUrlPrefix !== newLanguageUrlPrefix) {
			const isNewUrlPrefixSlash = newLanguageUrlPrefix === '/';
			const isCurrentUrlPrefixLanguage = SUPPORTED_LANGUAGES[currentLanguageUrlPrefix];

			if (isNewUrlPrefixSlash && isCurrentUrlPrefixLanguage) {
				const newPath = pathname.replace(`/${currentLanguageUrlPrefix}`, '');
				changeLanguage(locale);
				return push(newPath);
			}

			if (!isNewUrlPrefixSlash && !isCurrentUrlPrefixLanguage && newLanguageBasedOnLocale) {
				const newPath = pathname === '/' ? newLanguageUrlPrefix : `${newLanguageUrlPrefix}${pathname}`;
				changeLanguage(locale);
				return push(newPath);
			}
		}
	};

	return (
		<>
			<Heading level={2}>
				{translate('common.chooseLanguage')}
			</Heading>
			{
				Object.keys(LOCALES).map((locale) => {
					return (
						<Button
							key={locale}
							handleClick={() => handleClick(LOCALES[locale])}
						>
							{LocalesLanguageEnum[locale]}
						</Button>
					);
				})
			}
			<Link to={`${languageUrlPrefix}`}>Home</Link>
			<Link to={`${languageUrlPrefix}/news`}>News</Link>
		</>
	);
};

export { LanguageSwitcher };
