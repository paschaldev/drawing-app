module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['jest'],
  ignorePatterns: ['jest.config.js', 'webpack.config.js'],
};
