import React from 'react';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Heading } from './components/Heading';
import { TestForm } from './TestForm';
import { Section } from './Section';

const App: React.FC = () => {
	return (
		<>
			<LanguageSwitcher />
			<Heading level={1}>React form</Heading>
			<TestForm />
			<Heading level={2}>React modal</Heading>
			<Section />
		</>
	);
};

export { App };
