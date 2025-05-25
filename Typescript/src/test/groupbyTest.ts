import {groupBy} from "../functions/groupBy";


class Human {
    constructor(public age: number, public name: string) {}
}

let h1 = new Human(21, "liao")
let h2 = new Human(21,"Jack")
let h3 = new Human(22, "Tom")
let h4 = new Human(22,'liao')
let arrHuman = [h1,h2,h3,h4]

describe('Group by tests', () => {
    test('test properly', () => {
        let result = {
            "Jack": [h2],
            "liao": [h1,h4],
            "Tom": [h3]
        }
        expect(groupBy(arrHuman,'name')).toEqual(result);
    });
    test('test empty array', () => {
        expect(groupBy([],'name')).toEqual({});
    });
});
