import React, { useLayoutEffect } from 'react';
import { useThemeSwitcher } from './hooks/useThemeSwitcher';
import { Heading } from './components/Heading';
import { TestForm } from './TestForm';
import { Section } from './Section';

const App: React.FC = () => {
	const { initializeTheme } = useThemeSwitcher();

	useLayoutEffect(() => {
		initializeTheme();
	}, [initializeTheme]);

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
