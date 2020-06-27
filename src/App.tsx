import React from 'react';

import { Heading } from './components/Heading';
import { TestForm } from './TestForm';
import { Section } from './Section';

const App: React.FC = () => {
	return (
		<>
			<Heading level={1}>React form</Heading>
			<TestForm />
			<Heading level={2}>React modal</Heading>
			<Section />
		</>
	);
};

export { App };
