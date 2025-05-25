import {mergeDeep} from "../functions/mergeDeep";
class Tool {
    constructor(public a: number, public b: number, public c: number) {}
}

class Human {
    constructor(public age: number, public name: string, public tool: Tool | null) {}
}

let t1 = new Tool(1, 2, 3);
let h1 = new Human(21, "liao", t1);
let h2 = new Human(22,'Tom', null);
describe('Memoize tests', () => {
    test('test depth 1', () => {
        let result = {
            age: 22,
            name: "Tom",
            tool: null,
            a: 1,
            b: 2,
            c: 3
        };
        expect(mergeDeep(h2,t1)).toEqual(result)
    });
    test('test cover', () => {
        expect(mergeDeep(h2,h1)).toEqual(h2)
    });
    test('test one null', () => {
        expect(mergeDeep(null,h1)).toEqual(h1)
    });
    test('test all null', () => {
        expect(mergeDeep(null,null)).toEqual(null)
    });
});
