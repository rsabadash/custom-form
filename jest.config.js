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
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
	testPathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/webpack/',
		'<rootDir>/coverage/'
	]
};
