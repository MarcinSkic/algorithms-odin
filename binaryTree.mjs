import util from "util";
import Queue from "./queue.mjs";

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

const tree = new Node("F");

tree.addValue("D")
    .addValue("E")
    .addValue("B")
    .addValue("A")
    .addValue("C")
    .addValue("J")
    .addValue("K")
    .addValue("G")
    .addValue("I")
    .addValue("H");

console.log(
    util.inspect(tree, { showHidden: false, depth: null, colors: true })
);

function RecursiveDepthTraversal(tree) {
    // DLR - Data, left, right
    function TraversePreorder(tree, result = []) {
        result.push(tree.value);

        if (tree.left !== null) {
            TraversePreorder(tree.left, result);
        }

        if (tree.right !== null) {
            TraversePreorder(tree.right, result);
        }

        return result;
    }

    function TraverseInorder(tree, result = []) {
        if (tree.left !== null) {
            TraverseInorder(tree.left, result);
        }

        result.push(tree.value);

        if (tree.right !== null) {
            TraverseInorder(tree.right, result);
        }

        return result;
    }

    function TraversePostorder(tree, result = []) {
        if (tree.left !== null) {
            TraversePostorder(tree.left, result);
        }

        if (tree.right !== null) {
            TraversePostorder(tree.right, result);
        }

        result.push(tree.value);

        return result;
    }

    //F, D, B, A, C, E, J, G, I, H, K
    console.log(TraversePreorder(tree));

    //A, B, C, D, E, F, G, H, I, J, K
    console.log(TraverseInorder(tree));

    //A, C, B, E, D, H, I, G, K, J, F
    console.log(TraversePostorder(tree));
}

function IterativeBreadthTraversal(tree) {
    const queue = new Queue();
    const result = [];

    queue.enqueue(tree);

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

RecursiveDepthTraversal(tree);
IterativeBreadthTraversal(tree);
