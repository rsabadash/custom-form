export type LocalesType = {
	en: 'en-US';
	ua: 'uk-UA';
};

type ValueOf<T> = T[keyof T];
export type LanguagesType = ValueOf<LocalesType>;

export const LOCALES: LocalesType = {
	en: 'en-US',
	ua: 'uk-UA'
};
