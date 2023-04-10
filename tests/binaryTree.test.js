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

    describe("buildTree", () => {
        it("builds on both sides", () => {
            const tree = Tree([1, 2, 3, 4, 5]);

            expect(tree.getRoot().value).toBe(3);
            expect(tree.getRoot().left.value).not.toBeFalsy();
            expect(tree.getRoot().right.value).not.toBeFalsy();
        });

        it("sorts array before building", () => {
            const tree = Tree([3, 2, 1, 4, 5]);

            expect(tree.getRoot().left.value).toBeLessThan(
                tree.getRoot().value
            );
            expect(tree.getRoot().right.value).toBeGreaterThanOrEqual(
                tree.getRoot().value
            );
        });

        it("removes duplicates", () => {
            const tree = Tree([1, 4, 2, 2, 3, 4, 5, 5]);
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe("insert", () => {
        it("works on empty Tree", () => {
            const tree = Tree();
            tree.insert(5);
            expect(tree.getRoot().value).toBe(5);
        });

        it("works when chained", () => {
            const tree = Tree();
            tree.insert(5).insert(4).insert(3);
            expect(tree.getRoot().left.left).not.toBeFalsy();
            expect(tree.inorder()).toEqual([3, 4, 5]);
        });

        it("adds value in correct position", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6]);
            tree.insert(-1);
            tree.insert(233);
            expect(tree.inorder()).toEqual([-1, 1, 2, 3, 4, 5, 6, 233]);
        });

        it("ignores duplicates", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6]);
            tree.insert(2);
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("delete", () => {
        it("deletes leafs", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.deleteNode(8);
            tree.deleteNode(4);
            expect(tree.inorder()).toEqual([1, 2, 3, 5, 6, 7]);
        });

        it("reconnects node from right side", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.deleteNode(6); //Delete leaf from left side
            tree.deleteNode(7); //Delete node with right node
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 8]);
        });

        it("reconnects node from left side", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.deleteNode(2);
            expect(tree.inorder()).toEqual([1, 3, 4, 5, 6, 7, 8]);
        });

        it("reconnects nodes from both sides", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.deleteNode(7);
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6, 8]);
        });

        it("handles deletion of root", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.deleteNode(5);
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 6, 7, 8]);
        });
    });

    describe("traversals", () => {
        it("empty preorder returns values array", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

            expect(tree.preorder()).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });

        it("empty inorder returns values array", () => {
            const sortedArray = [1, 2, 3, 4, 5, 6, 7];
            const tree = Tree(sortedArray);

            expect(tree.inorder()).toEqual(sortedArray);
        });

        it("empty postorder returns values array", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

            expect(tree.postorder()).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });
    });

    describe("duplicates", () => {
        it.todo("ignores when trying to add");
    });
});
