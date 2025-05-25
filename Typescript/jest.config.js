module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/test/**/*.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
};