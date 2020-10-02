import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { App } from '../../App';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslationState } from '../Internationalization/const';
import { routes } from './const';

const Registration = lazy(() => import('../../modules/Registration'));

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

			<Switch>
				{
					languageUrlPrefix !== '' && (
						<Redirect exact from="/" to={languageUrlPrefix} />
					)
				}
				<Route path={`${languageUrlPrefix}${routes.signUp}`}>
					<Suspense fallback={<div>Завантаження</div>}>
						<Registration />
					</Suspense>
				</Route>
				<Route path={`${languageUrlPrefix}/news`}>
					<NewsFeed />
				</Route>
				<Route exact path={`${languageUrlPrefix}`}>
					<App />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export { Routes };
