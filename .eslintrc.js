module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [],
  rules: {
    'no-unused-vars': 0,
    'no-console': 'off',
    'max-classes-per-file': 0,
    indent: ['off', 2],
  },
};
