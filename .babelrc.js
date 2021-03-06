const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
	"presets": [
		["@babel/preset-env",
			{
				"useBuiltIns": "usage",
				"corejs": {
					"version": 3,
					"proposals": true
				},
				"modules": isTest ? 'commonjs' : false
			}
		],
		"@babel/preset-react",
		"@babel/preset-typescript"
	],
	"plugins": [
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-proposal-class-properties",
		["@babel/plugin-transform-runtime", {
			"corejs": {
				"version": 3,
				"proposals": true
			},
			"useESModules": isTest ? 'auto' : true
		}]
	]
};
