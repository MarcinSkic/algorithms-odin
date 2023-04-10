import { describe, expect, jest, it } from "@jest/globals";
import isSorted from "../isSorted";

describe("isSorted", () => {
    it("true on empty arrays", () => {
        expect(isSorted([])).toBeTruthy();
    });

    it("true on one element arrays", () => {
        expect(isSorted([-534])).toBeTruthy();
    });

    it("true on sorted arrays", () => {
        expect(isSorted([-534, 1, 53, 323])).toBeTruthy();
    });

    it("false on unsorted arrays", () => {
        expect(isSorted([1, 53, 323, -534])).toBeFalsy();
    });
});
