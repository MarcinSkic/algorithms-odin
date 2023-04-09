import { StackObject, StackArray } from "../stack.js";
import {
    beforeAll,
    describe,
    expect,
    jest,
    test,
    afterEach,
    beforeEach,
} from "@jest/globals";

describe("StackObject", () => {
    let stack;
    beforeEach(() => {
        stack = new StackObject();
        stack.push(1).push(2).push(3);
    });

    it("is instance of its class", () => {
        expect(stack).toBeInstanceOf(StackObject);
    });

    it("push element on empty stack", () => {
        expect(new StackObject().push(5)).toMatchObject({
            top: { value: 5, bottom: null },
        });
    });

    it("push chaining works", () => {
        stack.push(56).push(7);
        expect(stack.top).toMatchObject({ value: 7 });
        expect(stack.top.bottom).toMatchObject({ value: 56 });
        expect(stack.top.bottom.bottom).not.toBeNull();
    });

    it("pop works", () => {
        const value = stack.pop();
        expect(value).toEqual(3);
        expect(stack.top).toMatchObject({ value: 2 });
        expect(stack.top.bottom).not.toBeNull();
    });

    it("pop can clear stack", () => {
        stack.pop();
        stack.pop();
        stack.pop();
        expect(stack.top).toBeNull();
    });

    it("popping empty stack throws error", () => {
        expect(() => new StackObject().pop()).toThrow();
    });
});

describe("StackArray", () => {
    const stackArray = new StackArray();
    it("is instance of its class", () => {
        expect(stackArray).toBeInstanceOf(StackArray);
    });

    it("push element on empty stack", () => {
        stackArray.push(5);
        expect(stackArray.stack).toContain(5);
    });

    it("push chaining works", () => {
        stackArray.push(56).push(7);
        expect(stackArray.stack[2]).toBe(7);
        expect(stackArray.stack[1]).toBe(56);
        expect(stackArray.stack[0]).toBe(5);
    });

    it("pop works", () => {
        const popStack = Object.assign(new StackArray(), { ...stackArray });
        expect(popStack.pop()).toEqual(7);
        expect(popStack.stack).toEqual([5, 56]);
        expect(popStack.stack).toHaveLength(2);
    });

    it("pop can clear stack", () => {
        const popStack = Object.assign(new StackArray(), { ...stackArray });
        popStack.pop();
        popStack.pop();
        popStack.pop();
        expect(popStack.stack).toHaveLength(0);
    });

    it("popping empty stack returns undefined", () => {
        expect(new StackArray().pop()).toBeUndefined();
    });
});
