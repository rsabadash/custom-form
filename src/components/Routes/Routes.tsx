import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { App } from '../../App';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslationState } from '../Internationalization/const';

const NewsFeed = () => {
	return (
		<div>EMPTY</div>
	);
};

const Routes = () => {
	const { languageUrlPrefix } = useTranslationState();

	return (
		<BrowserRouter>
			<LanguageSwitcher />

			<Route exact path={`${languageUrlPrefix}`}>
				<App />
			</Route>
			<Route path={`${languageUrlPrefix}/news`}>
				<NewsFeed />
			</Route>
		</BrowserRouter>
	);
};

export { Routes };
