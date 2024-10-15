import { pathsToModuleNameMapper } from 'ts-jest';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['__mocks__', 'load'],
    roots: ['<rootDir>/__tests__'],
    modulePaths: ['.'],
    moduleNameMapper: pathsToModuleNameMapper({
        '@/*': ['src/*'],
    }),
};
