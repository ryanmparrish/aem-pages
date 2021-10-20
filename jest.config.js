module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: [ 'js' ],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.html?$': 'jest-raw-loader'
    },
    setupFilesAfterEnv: ["./jest.setup.js"]
};