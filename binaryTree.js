import Queue from "./queue.js";
import { StackObject } from "./stack.js";

class Node {
    value;
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }

    addValue(newValue) {
        if (newValue < this.value) {
            if (this.left === null) {
                this.left = new Node(newValue);
            } else {
                this.left.addValue(newValue);
            }
        } else {
            if (this.right === null) {
                this.right = new Node(newValue);
            } else {
                this.right.addValue(newValue);
            }
        }

        return this;
    }
}

const Tree = (array = []) => {
    let root = buildTree(array);

    const getRoot = () => {
        return root;
    };

    const addValue = (value) => {
        if (root === null) {
            root = new Node(value);
        } else {
            root.addValue(value);
        }
        return this;
    };

    function buildTree(array = []) {
        if (array.length === 0) {
            return null;
        }

        if (array.length === 1) {
            return new Node(array[0]);
        }

        let tree = new Node(array[Math.floor(array.length / 2)]);

        tree.left = buildTree(array.slice(0, Math.floor(array.length / 2)));
        tree.right = buildTree(array.slice(Math.floor(array.length / 2) + 1));

        return tree;
    }

    function inorder_iterative() {
        function getNodeAdapter(node) {
            return {
                node,
                leftFinished: !node.left,
                valueAdded: false,
                rightFinished: !node.right,
            };
        }

        const stack = new StackObject();
        const result = [];

        stack.push({
            node: root,
            leftFinished: !root.left,
            valueAdded: false,
            rightFinished: !root.right,
        });

        console.log(stack);

        while (stack.top !== null) {
            let top = stack.pop();

            if (!top.leftFinished) {
                top.leftFinished = true;
                stack.push(top);
                stack.push(getNodeAdapter(top.node.left));
                continue;
            }

            if (!top.valueAdded) {
                top.valueAdded = true;
                result.push(top.node.value);
            }

            if (!top.rightFinished) {
                top.rightFinished = true;
                stack.push(getNodeAdapter(top.node.right));
            }
        }

        console.log({ iterativeDepth: result });
    }

    // DLR - Data, left, right
    function preorder(root, result = []) {
        result.push(root.value);

        if (root.left !== null) {
            preorder(root.left, result);
        }

        if (root.right !== null) {
            preorder(root.right, result);
        }

        return result;
    }

    function inorder(tree, result = []) {
        if (tree.left !== null) {
            inorder(tree.left, result);
        }

        result.push(tree.value);

        if (tree.right !== null) {
            inorder(tree.right, result);
        }

        return result;
    }

    function postorder(result = []) {
        if (root.left !== null) {
            postorder(root.left, result);
        }

        if (root.right !== null) {
            postorder(root.right, result);
        }

        result.push(root.value);

        return result;
    }

    function levelOrder_iterative() {
        const queue = new Queue();
        const result = [];

        queue.enqueue(root);

        while (!queue.empty) {
            const node = queue.dequeue();

            result.push(node.value);

            if (node.left !== null) {
                queue.enqueue(node.left);
            }
            if (node.right !== null) {
                queue.enqueue(node.right);
            }
        }

        console.log(result);
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? "│   " : "    "}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? "    " : "│   "}`,
                true
            );
        }
    };

    return {
        getRoot,
        addValue,
        inorder_iterative,
        inorder,
        postorder,
        preorder,
        levelOrder_iterative,
        prettyPrint,
    };
};

export default Tree;
