import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

import { App } from './App';

if (String(process.env.NODE_ENV) !== 'production') {
	const axe = require('react-axe');
	axe(React, ReactDOM, 1000);
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
);
