require('../src/reduce');
function sum(a,b){
    return a+b
}
describe('my reduce tests', () => {
    test('test properly', () => {
        let arr = [1,2,3,4]
        expect(arr.myReduce(sum,10)).toBe(20);
    });
    test('test properly without initalValue', () => {
        let arr = [1,2,3,4]
        expect(arr.myReduce(sum)).toBe(10);
    });
    test('test null function', () => {
        expect(() => [].myReduce(null)).toThrowError(TypeError, 'The callback is not a function');
    });
    test('test null.myReducer', () => {
        expect(() => null.myReduce(null)).toThrowError(TypeError, 'called on null or undefined');
    });
    test('test empty array without intialValue', () => {
        expect(() => [].myReduce(sum)).toThrowError(TypeError, 'Reduce of empty array with no initial value');
    });
    test('test empty array with initialValue', () => {
        expect([].myReduce(sum,10)).toBe(10);
    });
});
