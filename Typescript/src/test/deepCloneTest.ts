import {deepClone} from "../functions/deepClone";

class Tool {
    constructor(public a: number, public b: number, public c: number) {}
}

class Human {
    constructor(public age: number, public name: string, public tool: Tool | null) {}
}

const t1 = new Tool(1, 2, 3);
const h1 = new Human(21, "liao", t1);

describe('Deep clone tests', () => {
    test('test basic type', () => {
        expect(deepClone(1)).toBe(1);
    });
    test('test null', () => {
        expect(null).toBe(null);
    });
    test('test array', () => {
        expect([1,2,3,4]).toEqual([1,2,3,4]);
    });
    test('test object', () => {
        expect(deepClone(t1)).toEqual(t1);
    });
    test('test object', () => {
        expect(deepClone(h1)).toEqual(h1);
    });
});
