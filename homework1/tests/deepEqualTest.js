const { deepEqual } = require('../src/deepEqual.js');

class Tool{
    constructor(a,b,c) {
        this.a = a
        this.b = b
        this.c = c
    }
}
class Human{
    constructor(age,name,tool) {
        this.age = age
        this.name = name
        this.tool = tool
    }
}

const t1 = new Tool(1,2,3)
const t2 = new Tool(1,1,1)
const h1 = new Human(21,"liao",t1)
const h2 = new Human(21,"liao",t2)
const h5 = new Human(21,"liao",null)

describe('Deep equal tests', () => {
    test('test basic type', () => {
        expect(deepEqual(1, 1)).toBe(true);
    });
    test('test basic type and null', () => {
        expect(deepEqual(1, null)).toBe(false);
    });

    test('test two null', () => {
        expect(deepEqual(null, null)).toBe(true);
    });

    test('test null and object', () => {
        expect(deepEqual(null, t1)).toBe(false);
    });
    test('test two objects of different classes', () => {
        expect(deepEqual(h1, t1)).toBe(false);
    });
    test('test objects, which should be equals each other(without object property', () => {
        expect(deepEqual(t1, t1)).toBe(true);
    });
    test('test objects, which has object as property and should be equals each other', () => {
        expect(deepEqual(h1, h1)).toBe(true);
    });
    test('test object different property(without object property)', () => {
        expect(deepEqual(t2, t1)).toBe(false);
    });
    test('test object different property(with object property)', () => {
        expect(deepEqual(h1, h2)).toBe(false);
    });
    test('test object different property(with null object property)', () => {
        expect(deepEqual(h1, h5)).toBe(false);
    });
});
