import { StackObject, StackArray } from "../stack.js";
import { expect, jest, test } from "@jest/globals";

const stack = new StackObject();
const stackArray = new StackArray();

it("StackObject is instance of its class", () => {
    expect(stack).toBeInstanceOf(StackObject);
});

it("push element on empty stack", () => {
    stack.push(5);
    expect(stack).toMatchObject({ top: { value: 5, bottom: null } });
});

it("push chaining works", () => {
    stack.push(56).push(7);
    expect(stack.top).toMatchObject({ value: 7 });
    expect(stack.top.bottom).toMatchObject({ value: 56 });
    expect(stack.top.bottom.bottom).toMatchObject({ value: 5 });
});

it("pop works", () => {
    const popStack = Object.assign(new StackObject(), { ...stack });
    expect(popStack.pop()).toEqual(7);
    expect(popStack.top).toMatchObject({ value: 56 });
    expect(popStack.top.bottom).not.toBeNull();
});

it("pop can clear stack", () => {
    const popStack = Object.assign(new StackObject(), { ...stack });
    popStack.pop();
    popStack.pop();
    popStack.pop();
    expect(popStack.top).toBeNull();
});

it("popping empty stack throws error", () => {
    expect(() => new StackObject().pop()).toThrow();
});

it("StackArray is instance of its class", () => {
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
