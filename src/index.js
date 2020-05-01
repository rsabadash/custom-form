import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

import TestForm from './TestForm';

if (process.env.NODE_ENV !== 'production') {
	const axe = require('react-axe');
	axe(React, ReactDOM, 1000);
}

ReactDOM.render(
	<TestForm />,
	document.querySelector('#root')
);
