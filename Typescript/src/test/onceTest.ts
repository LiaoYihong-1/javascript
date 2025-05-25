import {once} from "../functions/once";
function returnNum(n: number): number {
    return n;
}
describe('Once tests', () => {
    test('test basic type', () => {
        let afterOnce = once(returnNum);
        expect(afterOnce(1)).toBe(1);
        expect(afterOnce(2)).toBe(1);
    });
});
