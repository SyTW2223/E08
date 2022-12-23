/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["./src"],
  testRunner: 'jest-circus/runner',
  maxWorkers: 4,
  runInParallel: true
};