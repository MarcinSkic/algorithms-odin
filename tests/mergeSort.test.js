import { describe, expect, jest, it } from "@jest/globals";
import mergeSort from "../mergeSort";
import isSorted from "../isSorted";

describe("mergeSort", () => {
    it("works on empty array", () => {
        expect(mergeSort([])).toEqual([]);
    });

    it("works in typical case", () => {
        expect(isSorted(mergeSort([3, 2, 1, 4, 5]))).toBeTruthy();
    });

    it("works on already sorted array", () => {
        expect(isSorted(mergeSort([1, 2, 3, 4, 5]))).toBeTruthy();
    });
});
