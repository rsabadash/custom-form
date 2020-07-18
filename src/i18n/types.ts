export type LocalesType = {
	'en-US': 'en-US';
	'uk-UA': 'uk-UA';
};

type ValueOf<T> = T[keyof T];
export type LanguagesType = ValueOf<LocalesType>;
