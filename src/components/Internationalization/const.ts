import { useContext, createContext } from 'react';
import { LanguagesType } from '../../i18n/locales';

export type InternationalizationProviderProps = {
	defaultLocale?: LanguagesType
};

export type TranslationProviderProps = {
	setLanguage: (locale: LanguagesType) => void;
};

const translationContextAPIStateDefaults = {
	translate: () => {
		console.warn('You should implement this method');
		return '';
	},
	setLanguage: () => {
		console.warn('You should implement this method');
	}
};

export type PlaceholdersType = {
	[prop: string]: string;
};

export type TranslationContextAPIProps = {
	translate: (value: string, placeholders?: PlaceholdersType) => string;
	setLanguage: (locale: LanguagesType) => void;
};

export const TranslationContextAPI = createContext<TranslationContextAPIProps>(translationContextAPIStateDefaults);

export const useTranslationAPI = (): never | TranslationContextAPIProps => {
	const context = useContext(TranslationContextAPI);

	if (context === undefined) {
		throw new Error('useModalContext must be used within a Modal');
	}

	return context;
};

export const DEFAULT_LOCALE = 'en-US';
export const LOCAL_STORAGE_LOCALE_KEY = 'locale';
