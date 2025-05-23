const {myPromiseAll} = require('../src/myPromiseAll');

describe('myPromiseAll', () => {
    test('resolves with all values when all promises succeed', async () => {
        let promises = [
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ];

        const result = await myPromiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });

    test('rejects with the first error when any promise fails', async () => {
        let promises = [
            Promise.resolve(1),
            Promise.reject(new Error('First error')),
            Promise.reject(new Error('Second error'))
        ];

        await expect(myPromiseAll(promises)).rejects.toThrow('First error');
    });

    test('resolves non-promises as-is', async () => {
        const promises = [
            1,
            Promise.resolve(2),
            3
        ];

        const result = await myPromiseAll(promises);
        expect(result).toEqual([1, 2, 3]);
    });
});