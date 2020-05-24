import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

import { App } from './App';

if (String(process.env.NODE_ENV) !== 'production') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const axe = require('react-axe');
	axe(React, ReactDOM, 1000);
}

ReactDOM.render(
	React.createElement(App),
	document.querySelector('#root')
);
