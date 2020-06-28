import { LanguagesType, LOCALES } from '../../i18n/locales';
import { localStorageManager } from '../../utilities/localStorageManager';
import { LOCAL_STORAGE_LOCALE_KEY } from './const';

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

export const defineUserLocale = (defaultLocale: string): LanguagesType => {
	let locale = localStorageManager.getItem(LOCAL_STORAGE_LOCALE_KEY);

	if (!locale) {
		locale = (navigator.languages && navigator.languages[0]) || navigator.language;
	}

	const isLanguageSupported = Object.values(LOCALES).some((localeValue) => localeValue === locale);

	if (!isLanguageSupported) {
		locale = defaultLocale;
	}

	localStorageManager.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);

	return locale as LanguagesType;
};

