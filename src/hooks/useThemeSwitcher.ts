import { useCallback, useEffect } from 'react';
import { useLocalState } from './useLocalState';

const THEME_LOCAL_STORAGE_KEY = 'theme';

const THEMES = {
	light: 'light',
	dark: 'dark'
} as const;

type LightTheme = typeof THEMES.light;
type DarkTheme = typeof THEMES.dark;
type ThemesType = LightTheme | DarkTheme;

const useThemeSwitcher = () => {
	const [theme, setTheme] = useLocalState<ThemesType>(THEME_LOCAL_STORAGE_KEY);

	const getSystemPreferredColorSchema = useCallback((): ThemesType => {
		return window.matchMedia('(prefers-color-scheme: light)').matches
			? THEMES.light
			: THEMES.dark;
	}, []);

	useEffect(() => {
		if (!theme) {
			setTheme(getSystemPreferredColorSchema());
		}
	}, [theme, setTheme, getSystemPreferredColorSchema]);

	const initializeTheme = useCallback(() => {
		document.body.dataset.theme = theme;
	}, [theme]);

	const toggleTheme = useCallback(() => {
		const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
		document.body.dataset.theme = newTheme;
		setTheme(newTheme);
	}, [theme, setTheme]);

	return {
		theme,
		setTheme,
		toggleTheme,
		initializeTheme
	};
};

export { useThemeSwitcher };
