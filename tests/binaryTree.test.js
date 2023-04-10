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

    describe("find", () => {
        it("works on left leaf", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(1).value).toEqual(1);
        });

        it("works on right leaf", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(8).value).toEqual(8);
        });

        it("works on mixed directions", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(4).value).toEqual(4);
        });

        it("works on root", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(5).value).toEqual(5);
        });
    });

    describe("traversals", () => {
        describe("levelOrder_iterative", () => {
            it("without callback returns values array", () => {
                const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);

                expect(tree.levelOrder_iterative()).toEqual([
                    5, 3, 7, 2, 4, 6, 8, 1,
                ]);
            });

            it("with callback, calls it for every element", () => {
                let sum = 0;
                const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
                const callback = jest.fn((element) => {
                    sum += element.value;
                });

                tree.levelOrder_iterative(callback);
                expect(callback).toHaveBeenCalledTimes(8);
                expect(sum).toEqual(36);
            });
        });

        describe("preorder", () => {
            it("empty returns values array", () => {
                const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

                expect(tree.preorder()).toEqual([4, 2, 1, 3, 6, 5, 7]);
            });

            it("with callback, calls it for every element", () => {
                let sum = 0;
                const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
                const callback = jest.fn((element) => {
                    sum += element.value;
                });

                tree.preorder(callback);
                expect(callback).toHaveBeenCalledTimes(8);
                expect(sum).toEqual(36);
            });
        });

        describe("inorder", () => {
            it("empty returns values array", () => {
                const sortedArray = [1, 2, 3, 4, 5, 6, 7];
                const tree = Tree(sortedArray);

                expect(tree.inorder()).toEqual(sortedArray);
            });

            it("with callback, calls it for every element", () => {
                let sum = 0;
                const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
                const callback = jest.fn((element) => {
                    sum += element.value;
                });

                tree.inorder(callback);
                expect(callback).toHaveBeenCalledTimes(8);
                expect(sum).toEqual(36);
            });
        });

        describe("postorder", () => {
            it("empty returns values array", () => {
                const tree = Tree([1, 2, 3, 4, 5, 6, 7]);

                expect(tree.postorder()).toEqual([1, 3, 2, 5, 7, 6, 4]);
            });

            it("with callback, calls it for every element", () => {
                let sum = 0;
                const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
                const callback = jest.fn((element) => {
                    sum += element.value;
                });

                tree.postorder(callback);
                expect(callback).toHaveBeenCalledTimes(8);
                expect(sum).toEqual(36);
            });
        });
    });

    describe("height", () => {
        it("null node has -1 height", () => {
            const tree = Tree([1]);
            expect(tree.height(null)).toBe(-1);
        });
        it("one node tree has 0 height", () => {
            const tree = Tree([1]);

            expect(tree.height(tree.getRoot())).toBe(0);
        });
        it("works on one line tree", () => {
            const tree = Tree();
            tree.insert(25).insert(24).insert(3).insert(8).insert(7);

            expect(tree.height(tree.getRoot())).toBe(4);
        });

        it("works on balanced tree", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.height(tree.getRoot())).toBe(3);
        });

        it("works on inner node", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.height(tree.getRoot().right)).toBe(1);
        });
    });

    describe("depth", () => {
        it("root depth should be 0", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.depth(tree.getRoot())).toBe(0);
        });

        it("works one level deep", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.depth(tree.getRoot().left)).toBe(1);
        });

        it("works many levels deep", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.depth(tree.getRoot().left.right)).toBe(2);
            expect(tree.depth(tree.getRoot().left.left.left)).toBe(3);
        });
    });

    describe("isBalanced", () => {
        it("happy path", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.isBalanced()).toBeTruthy();
        });

        it("unbalanced gives false", () => {
            const tree = Tree();
            tree.insert(25).insert(24).insert(3).insert(8).insert(7);
            expect(tree.isBalanced()).toBeFalsy();
        });

        it("works on almost balanced", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            tree.insert(-1);

            expect(tree.isBalanced()).toBeFalsy();
        });
    });

    describe("isLeaf", () => {
        it("works on leaf", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(1).isLeaf()).toBeTruthy();
        });

        it("works on inner node with left and right node", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(5).isLeaf()).toBeFalsy();
        });

        it("works on inner node with one child node", () => {
            const tree = Tree([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.find(2).isLeaf()).toBeFalsy();
        });
    });

    describe("rebalance", () => {
        it("doesn't alter content of tree", () => {
            const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8];
            const tree = Tree(sortedArray);
            tree.rebalance();
            expect(tree.inorder()).toEqual(sortedArray);
        });

        it("rebalances tree", () => {
            const tree = Tree();
            tree.insert(25).insert(24).insert(3).insert(8).insert(7);
            expect(tree.isBalanced()).toBeFalsy();
            tree.rebalance();
            expect(tree.isBalanced()).toBeTruthy();
        });
    });

    describe("'Tie it all together' test", () => {
        it("final test", () => {
            const tree = Tree([
                1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
            ]);

            expect(tree.isBalanced()).toBeTruthy();

            for (let i = 0; i < 200; i++) {
                tree.insert(Math.floor((Math.random() * 1000) % 1000));
            }

            expect(tree.isBalanced()).toBeFalsy();

            tree.rebalance();

            expect(tree.isBalanced()).toBeTruthy();
        });
    });
});
