module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.scss$': 'identity-obj-proxy',
		'\\.css$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	collectCoverageFrom: ['**/src/**/*.{js,jsx}'],
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/webpack/']
};
