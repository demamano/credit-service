module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  // moduleNameMapper: {
  //   '^@prisma/client$': '<rootDir>/__mocks__/prismaMock.ts',
  // },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // reporters: [
  //   'default',
  //   [
  //     'jest-html-reporters',
  //     {
  //       publicPath: './html-report',
  //       filename: 'report.html',
  //       expand: true,
  //     },
  //   ],
  // ],
};
