import {memoize} from "../functions/memoize";
function returnNum(n: number): number {
    return n;
}
function sum(a:number, b:number):number{
    return a+b
}
describe('Memoize tests', () => {
    test('test function with one parameters', () => {
        let func = memoize(returnNum)
        let result = func(2)
        expect(result).toBe(2)
        expect(result).toBe(2)
    });

    test('test function with two parameters', () => {
        let func = memoize(sum)
        let result = func(2,3)
        expect(result).toBe(5)
    });
});
