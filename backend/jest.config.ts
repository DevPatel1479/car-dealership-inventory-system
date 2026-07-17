import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',

  extensionsToTreatAsEsm: ['.ts'],

  moduleFileExtensions: ['ts', 'js', 'json'],

  roots: ['<rootDir>/tests'],

  testMatch: ['**/*.test.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      },
    ],
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  collectCoverageFrom: ['src/**/*.ts', '!src/server.ts', '!src/app.ts'],

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  clearMocks: true,

  verbose: true,
};

export default config;
