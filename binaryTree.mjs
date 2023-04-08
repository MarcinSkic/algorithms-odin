//DLR Traversal:
//F, D, B, A, C, E, J, G, I, H, K
import util from "util";

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
