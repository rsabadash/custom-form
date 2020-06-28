import React from 'react';

import { LOCALES, LanguagesType } from '../../i18n/locales';
import { useTranslationAPI } from '../Internationalization/const';
import { Button } from '../Button';
import { Heading } from '../Heading';

const LanguageSwitcher: React.FC = () => {
	const { translate, setLanguage } = useTranslationAPI();

	const handleClick = (locale: LanguagesType): void => {
		setLanguage(locale);
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
							{locale}
						</Button>
					);
				})
			}
		</>
	);
};

export { LanguageSwitcher };
