import { isEqual } from '../functions/isEqual';

class Tool {
    constructor(public a: number, public b: number, public c: number) {}
}

class Human {
    constructor(public age: number, public name: string, public tool: Tool | null) {}
}

const t1 = new Tool(1, 2, 3);
const t2 = new Tool(1, 1, 1);
const h1 = new Human(21, "liao", t1);
const h2 = new Human(21, "liao", t2);
const h5 = new Human(21, "liao", null);

describe('Deep equal tests', () => {
    test('test basic type', () => {
        expect(isEqual(1, 1)).toBe(true);
    });
    test('test basic type and null', () => {
        expect(isEqual(1, null)).toBe(false);
    });

    test('test two null', () => {
        expect(isEqual(null, null)).toBe(true);
    });

    test('test null and object', () => {
        expect(isEqual(null, t1)).toBe(false);
    });
    test('test two objects of different classes', () => {
        expect(isEqual(h1, t1)).toBe(false);
    });
    test('test objects, which should be equals each other(without object property', () => {
        expect(isEqual(t1, t1)).toBe(true);
    });
    test('test objects, which has object as property and should be equals each other', () => {
        expect(isEqual(h1, h1)).toBe(true);
    });
    test('test object different property(without object property)', () => {
        expect(isEqual(t2, t1)).toBe(false);
    });
    test('test object different property(with object property)', () => {
        expect(isEqual(h1, h2)).toBe(false);
    });
    test('test object different property(with null object property)', () => {
        expect(isEqual(h1, h5)).toBe(false);
    });
});
    