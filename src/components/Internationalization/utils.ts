import { LocalesLanguageEnum } from '../../i18n/locales';
import { LanguagesType } from '../../i18n/types';
import { localStorageManager } from '../../utilities/localStorageManager';
import { LOCAL_STORAGE_LOCALE_KEY, DEFAULT_LOCALE } from './const';

export type NestedMessagesType = {
	[prop: string]: string | NestedMessagesType;
};

export const flattenMessages = (nestedMessages: NestedMessagesType, prefix = ''): { [prop: string]: string } => {
	return Object.keys(nestedMessages).reduce((messages, key) => {
		const value = nestedMessages[key];
		const prefixedKey = prefix ? `${prefix}.${key}` : key;
		if (typeof value === 'string') {
			messages[prefixedKey] = value;
		} else {
			Object.assign(messages, flattenMessages(value, prefixedKey));
		}
		return messages;
	}, {});
};

export const defineUserLocale = (defaultLocale?: string): LanguagesType => {
	let locale = localStorageManager.getItem<string>(LOCAL_STORAGE_LOCALE_KEY);

	if (!locale) {
		locale = (navigator.languages && navigator.languages[0]) || navigator.language;
	}

	const isLanguageSupported = LocalesLanguageEnum[locale];

	if (!isLanguageSupported) {
		locale = defaultLocale || DEFAULT_LOCALE;
	}

	localStorageManager.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);

	return locale as LanguagesType;
};

