module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['**/*.js'],
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text', 'html'],
    testEnvironment: 'node',
  };
  
  