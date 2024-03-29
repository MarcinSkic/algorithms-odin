import Queue from "./queue.js";
import { StackObject } from "./stack.js";
import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";

class Node {
    value;
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }

    insert(newValue) {
        if (newValue === this.value) {
            return;
        }

        if (newValue < this.value) {
            if (this.left === null) {
                this.left = new Node(newValue);
            } else {
                this.left.insert(newValue);
            }
        } else {
            if (this.right === null) {
                this.right = new Node(newValue);
            } else {
                this.right.insert(newValue);
            }
        }

        return this;
    }

    isLeaf() {
        return !Boolean(this.right || this.left);
    }
}

const Tree = (array = []) => {
    let root = buildTree(removeDuplicates(mergeSort(array)));

    const getRoot = () => {
        return root;
    };

    function insert(value) {
        if (root === null) {
            root = new Node(value);
        } else {
            root.insert(value);
        }
        return this;
    }

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

    function deleteNode(value) {
        function reconnectLeftNode(newParent, node) {
            if (newParent.left !== null) {
                reconnectLeftNode(newParent.left, node);
            } else {
                newParent.left = node;
            }
        }

        function internal(node, value) {
            if (node.value === value) {
                return { left: node.left, right: node.right };
            }

            let result;

            if (node.left !== null) {
                result = internal(node.left, value);
                if (result) {
                    if (result.right !== null) {
                        reconnectLeftNode(result.right, result.left);
                        node.left = result.right;
                    } else {
                        node.left = result.left;
                    }
                }
            }

            if (node.right !== null) {
                result = internal(node.right, value);
                if (result) {
                    if (result.right !== null) {
                        reconnectLeftNode(result.right, result.left);
                        node.right = result.right;
                    } else {
                        node.right = result.left;
                    }
                }
            }
        }

        let rootResult = internal(root, value);

        if (rootResult) {
            if (rootResult.right !== null) {
                reconnectLeftNode(rootResult.right, rootResult.left);
                root = rootResult.right;
            } else {
                root = rootResult.left;
            }
        }
    }

    function find(value) {
        function internal(node, value) {
            if (node.value === value) {
                return node;
            }

            let foundNode = null;
            if (node.left !== null) {
                foundNode = internal(node.left, value);
                if (foundNode) {
                    return foundNode;
                }
            }

            if (node.right !== null) {
                foundNode = internal(node.right, value);
            }

            return foundNode;
        }

        return internal(root, value);
    }

    function levelOrder_iterative(callback) {
        const queue = new Queue();
        const result = !callback ? [] : null;

        queue.enqueue(root);

        while (!queue.empty) {
            const node = queue.dequeue();

            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            if (node.left !== null) {
                queue.enqueue(node.left);
            }
            if (node.right !== null) {
                queue.enqueue(node.right);
            }
        }

        return result;
    }

    function preorder(callback) {
        function internal(node) {
            let result = [];

            if (callback) {
                callback(node);
            } else {
                result = [node.value];
            }

            if (node.left !== null) {
                result = [...result, ...internal(node.left)];
            }

            if (node.right !== null) {
                result = [...result, ...internal(node.right)];
            }

            return result;
        }

        return internal(root);
    }

    function inorder(callback) {
        function internal(node, result = []) {
            if (node.left !== null) {
                internal(node.left, result);
            }

            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            if (node.right !== null) {
                internal(node.right, result);
            }

            return result;
        }

        return internal(root);
    }

    function postorder(callback) {
        function internal(node, result = []) {
            if (node.left !== null) {
                internal(node.left, result);
            }

            if (node.right !== null) {
                internal(node.right, result);
            }

            if (callback) {
                callback(node);
            } else {
                result.push(node.value);
            }

            return result;
        }

        return internal(root);
    }

    function height(node) {
        if (!node) {
            return -1;
        }

        let leftHeight = -1,
            rightHeight = -1;
        if (node.left !== null) {
            leftHeight = height(node.left);
        }

        if (node.right !== null) {
            rightHeight = height(node.right);
        }

        return 1 + Math.max(leftHeight, rightHeight);
    }

    function depth(node) {
        function internal(node, targetNode) {
            if (targetNode.value === node.value) {
                return 0;
            }

            if (node.left !== null) {
                const value = internal(node.left, targetNode);
                if (value !== false) {
                    return value + 1;
                }
            }

            if (node.right !== null) {
                const value = internal(node.right, targetNode);
                if (value !== false) {
                    return value + 1;
                }
            }

            return false;
        }

        return internal(root, node);
    }

    function isBalanced() {
        function internal(node) {
            if (node === null) {
                return -1;
            }

            const leftHeight = internal(node.left);
            const rightHeight = internal(node.right);

            if (leftHeight === false || rightHeight === false) return false;
            if (Math.abs(leftHeight - rightHeight) > 1) return false;

            return height(node);
        }

        return internal(root);
    }

    function rebalance() {
        root = buildTree(inorder());
    }

    const prettyPrint = () => {
        function internal(node, prefix = "", isLeft = true) {
            if (node === null) {
                return;
            }
            if (node.right !== null) {
                internal(
                    node.right,
                    `${prefix}${isLeft ? "│   " : "    "}`,
                    false
                );
            }
            console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
            if (node.left !== null) {
                internal(
                    node.left,
                    `${prefix}${isLeft ? "    " : "│   "}`,
                    true
                );
            }
        }

        internal(root);
    };

    return {
        getRoot,
        insert,
        deleteNode,
        find,
        inorder_iterative,
        inorder,
        postorder,
        preorder,
        levelOrder_iterative,
        height,
        depth,
        isBalanced,
        rebalance,
        prettyPrint,
    };
};

function tieItAllTogether() {
    const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    tree.prettyPrint();
    console.log(tree.levelOrder_iterative());
    console.log(tree.preorder());
    console.log(tree.postorder());
    console.log(tree.inorder());

    for (let i = 0; i < 200; i++) {
        tree.insert(Math.floor((Math.random() * 1000) % 1000));
    }

    tree.prettyPrint();

    tree.rebalance();

    tree.prettyPrint();
    console.log(tree.preorder());
    console.log(tree.postorder());
    console.log(tree.inorder());
}

export default Tree;
