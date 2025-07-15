module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'no-mixed-spaces-and-tabs': 0,
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		indent: ['error', 'tab'],
		'linebreak-style': 'off',
		quotes: ['error', 'single'],
		semi: ['error', 'always'],

		'@typescript-eslint/no-unused-vars': 'off',
		// Set to 'error' to enforce the rule and show errors for unused variables and imports
		// '@typescript-eslint/no-unused-vars': 'error',
	},
};
