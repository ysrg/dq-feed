module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
}
