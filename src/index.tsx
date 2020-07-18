import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import { Routes } from './components/Routes';
import { InternationalizationProvider } from './components/Internationalization';

if (String(process.env.NODE_ENV) !== 'production') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const axe = require('react-axe');
	axe(React, ReactDOM, 1000);
}

ReactDOM.render(
	<InternationalizationProvider>
		<Routes/>
	</InternationalizationProvider>,
	document.querySelector('#root')
);
