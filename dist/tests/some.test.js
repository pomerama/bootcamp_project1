"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const someOther_1 = require("../js/someOther");
describe('SomeOther', () => {
    let myObject = {};
    beforeEach(() => {
        myObject = new someOther_1.SomeOther();
    });
    it('is created empty', () => {
        expect(myObject.top).toBe(-1);
        expect(myObject.items).toEqual({});
    });
    it('cluck should return OK', () => {
        expect(myObject.cluck()).toBe("OK");
    });
});
