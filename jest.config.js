module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	// transform: {
	// 	'^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
	// 	'.*': '<rootDir>/node_modules/babel-jest'
	// },
	// transformIgnorePatterns: [
	// 	'<rootDir>/node_modules/'
	// ],
	moduleNameMapper: {
		'\\.scss$': 'identity-obj-proxy',
		'\\.css$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: [
		'@testing-library/jest-dom/extend-expect',
		'jest-axe/extend-expect'
	],
	collectCoverageFrom: ['**/src/**/*.{js,jsx}', '**/src/**/*.{ts,tsx}'],
	testPathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/webpack/',
		'<rootDir>/coverage/'
	]
};
