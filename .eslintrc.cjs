module.exports = {
	"root": true,
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	"parser": "@typescript-eslint/parser",
	"plugins": ["@typescript-eslint"],
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2020,
	},
	"env": {
		"browser": true,
		"es2017": true,
		"node": true
	},
	"rules": {
		"max-lines": "warn",
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"quote-props": ["warn", "always"],
		"require-await": "error",
		"semi": [
			"error",
			"never"
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ "argsIgnorePattern": "^unused", "varsIgnorePattern": "^unused" }
		],
		"@typescript-eslint/no-explicit-any": "off",
		"space-before-function-paren": ["error", "never"],
		"object-curly-spacing": ["error", "always"],
	}
}
