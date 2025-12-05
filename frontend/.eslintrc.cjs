module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react'],
  rules: {
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/no-unknown-property': 'off',
    'react/no-unescaped-entities': 'off',
    'react/display-name': 'off',
    'no-irregular-whitespace': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'no-case-declarations': 'off',
    'no-empty': 'off'
  }
};