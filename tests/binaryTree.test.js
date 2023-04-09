import Tree from "../binaryTree.js";
import { describe, expect, jest, it } from "@jest/globals";

describe("Tree", () => {
    describe("constructor", () => {
        it("works when empty", () => {
            expect(Tree());
        });

        it("builds from passed array", () => {
            const tree = Tree([1, 2, 3, 4, 5]);
            expect(tree.getRoot().value).not.toBeFalsy();
        });
    });

    describe("addValue", () => {
        it("works on empty Tree", () => {
            const tree = Tree();
            tree.addValue(5);
            expect(tree.getRoot().value).toBe(5);
        });
    });

    describe("buildTree", () => {
        it("builds on both sides", () => {
            const tree = Tree([1, 2, 3, 4, 5]);
            tree.prettyPrint(tree.getRoot());

            expect(tree.getRoot().value).toBe(3);
            expect(tree.getRoot().left.value).not.toBeFalsy();
            expect(tree.getRoot().right.value).not.toBeFalsy();
        });
    });

    describe("duplicates", () => {
        it.todo("ignores when building");
        it.todo("ignores when trying to add");
    });
});
