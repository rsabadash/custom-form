import { useContext, createContext } from 'react';
import { LanguagesType } from '../../i18n/types';

export const DEFAULT_LOCALE = 'en-US';
export const LOCAL_STORAGE_LOCALE_KEY = 'locale';

export type InternationalizationProviderProps = {
	defaultLocale?: LanguagesType
};

export type TranslationProviderProps = {
	locale: LanguagesType;
	changeLanguage: (locale: LanguagesType) => void;
};

const translationContextAPIDefaults = {
	translate: () => {
		console.warn('You should implement this method');
		return '';
	},
	changeLanguage: () => {
		console.warn('You should implement this method');
	}
};

const translationContextStateDefaults = {
	languageUrlPrefix: '/'
};

export type PlaceholdersType = {
	[prop: string]: string;
};

export type TranslationContextAPIProps = {
	translate: (value: string, placeholders?: PlaceholdersType) => string;
	changeLanguage: (locale: LanguagesType) => void;
};

export type TranslationContextStateProps = {
	languageUrlPrefix: string;
};

export const TranslationContextAPI = createContext<TranslationContextAPIProps>(translationContextAPIDefaults);
export const TranslationContextState = createContext<TranslationContextStateProps>(translationContextStateDefaults);

export const useTranslationAPI = (): never | TranslationContextAPIProps => {
	const context = useContext(TranslationContextAPI);

	if (context === undefined) {
		throw new Error('useModalContext must be used within a Modal');
	}

	return context;
};

export const useTranslationState = (): never | TranslationContextStateProps => {
	const context = useContext(TranslationContextState);

	if (context === undefined) {
		throw new Error('useModalContext must be used within a Modal');
	}

	return context;
};

