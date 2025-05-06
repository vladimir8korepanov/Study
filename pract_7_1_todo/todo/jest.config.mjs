export default {
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.js'],
  transformIgnorePatterns: [],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
};