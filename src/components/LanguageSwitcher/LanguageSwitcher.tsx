import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { LanguagesType } from '../../i18n/types';
import { LOCALES, LocalesLanguageEnum, SUPPORTED_LANGUAGES } from '../../i18n/locales';
import { DEFAULT_LOCALE, useTranslationAPI, useTranslationState } from '../Internationalization/const';
import { Heading } from '../Heading';

const LanguageSwitcher: React.FC = () => {
	const { translate, changeLanguage } = useTranslationAPI();
	const { languageUrlPrefix } = useTranslationState();
	const { pathname } = useLocation();

	const getLanguageLink = (locale: LanguagesType): string => {
		const newLanguageBasedOnLocale = LocalesLanguageEnum[locale];
		const languageUrlPrefix = locale === DEFAULT_LOCALE ? '/' : `/${newLanguageBasedOnLocale}`;
		const isNewUrlPrefixSlash = languageUrlPrefix === '/';

		const languageInPath = pathname.split('/')[1];

		if (SUPPORTED_LANGUAGES[languageInPath] && languageInPath !== newLanguageBasedOnLocale) {
			const replacer = isNewUrlPrefixSlash ? '' : languageUrlPrefix;
			return pathname.replace(`/${languageInPath}`, replacer);
		}

		if (languageInPath === '' && SUPPORTED_LANGUAGES[newLanguageBasedOnLocale] && !isNewUrlPrefixSlash) {
			return pathname === '/' ? languageUrlPrefix : `${languageUrlPrefix}${pathname}`;
		}

		if (languageInPath !== '' && !SUPPORTED_LANGUAGES[languageInPath] && !isNewUrlPrefixSlash) {
			return `${languageUrlPrefix}${pathname}`;
		}

		return pathname;
	};

	return (
		<>
			<Heading level={2}>
				{translate('common.chooseLanguage')}
			</Heading>
			{
				LOCALES.map((locale) => {
					const languageLink = getLanguageLink(locale);
					const languageCode = LocalesLanguageEnum[locale];

					return (
						<Link
							key={locale}
							to={languageLink}
							lang={locale}
							hrefLang={locale}
							onClick={() => changeLanguage(locale)}
						>
							{translate(`languagesNativeName.${languageCode}`)}
						</Link>
					);
				})
			}
			<Link to={`${languageUrlPrefix}`}>{translate('common.homePage')}</Link>
			<Link to={`${languageUrlPrefix}/news`}>{translate('common.newsPage')}</Link>
		</>
	);
};

export { LanguageSwitcher };
