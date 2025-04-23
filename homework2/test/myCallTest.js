// ✅ 正确引入方式（路径需调整）
class MyObject{
    constructor(a,b) {
        this.a = a
        this.b = b
    }
    mySum (c){
        return this.a+this.b+c;
    }
}
require('../src/code.js');
describe('Test for functions', () => {
    describe('myCall test', () => {
        test('test this context', () => {
            let obj = { value: 42 };
            function testFunc() { return this.value; }

            let result = testFunc.myCall(obj);
            expect(result).toBe(42);
        });

        test('test function with parameters', () => {

            function sum(a, b) { return a + b; }

            let result = sum.myCall(null, 2, 3);
            expect(result).toBe(5);
        });

        test('test object function',()=>{
            let result = new MyObject(1,2,3).mySum.myCall(new MyObject(3,4),5);
            expect(result).toBe(12);
        })

    });

    describe('myApply test', () => {
        test('test context', () => {
            let obj = { value: 42 };
            function testFunc() { return this.value; }

            let result = testFunc.myApply(obj,[]);
            expect(result).toBe(42);
        });

        test('test input array', () => {
            function multiply(a, b) { return a * b; }

            let result = multiply.myApply(null, [4, 5]);
            expect(result).toBe(20);
        });

        test('test object function with parameters', () => {
            let result = new MyObject(1,2,3).mySum.myApply(new MyObject(3,4),[5]);
            expect(result).toBe(12);
        });
        test('return null when args not a array', () => {
            let result = new MyObject(1,2,3).mySum.myApply(new MyObject(3,4),100000);
            expect(result).toBe(null);
        });
    });

    describe('myBind test', () => {
        test('test context', () => {
            let obj = { value: 10 };
            function testFunc() { return this.value; }

            let boundFunc = testFunc.myBind(obj);
            expect(boundFunc()).toBe(10);
        });

        test('test array parameters function', () => {
            function sum(a, b) { return a + b; }

            let boundFunc = sum.myBind(null,1,2);
            expect(boundFunc()).toBe(3);
        });

        test('test object function with parameters', () => {
            let bindFunc = new MyObject(1,2,3).mySum.bind(new MyObject(3,4),5);
            expect(bindFunc()).toBe(12);
        });
    });
});