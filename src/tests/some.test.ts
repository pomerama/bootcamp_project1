import { SomeOther } from "../js/someOther";

describe('SomeOther', () => {
    let myObject = {} as SomeOther;

    beforeEach(() => {
        myObject = new SomeOther();
    });

    it('is created empty', () => {
        expect(myObject.top).toBe(-1);
        expect(myObject.items).toEqual({});

    });
    it('cluck should return OK', () => {
        expect(myObject.cluck()).toBe("OK");
    })
});