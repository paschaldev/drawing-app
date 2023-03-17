const tsconfigPathJest = require('tsconfig-paths-jest');
const tsconfig = require('./tsconfig.json');

const moduleNameMapper = tsconfigPathJest(tsconfig);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
