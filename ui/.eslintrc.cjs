/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "amd": true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-components": "off",
    "no-unused-vars": "off",
    "no-empty-function": "off",
    "prefer-const": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
}
