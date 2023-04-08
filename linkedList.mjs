import util from "util";

export default class LinkedList {
    head = null;
    tail = null;
    size = 0;

    append(value) {
        const node = new Node(value);

        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.size++;
        this.tail = node;
        return this;
    }

    prepend(value) {
        const node = new Node(value);

        if (this.tail === null) {
            this.tail = node;
        } else {
            node.next = this.head;
        }

        this.size++;
        this.head = node;
        return this;
    }

    at(index) {
        if (index > this.size - 1) return undefined;
        let node = this.head;

        while (index !== 0) {
            node = node.next;
            index--;
        }

        return node;
    }

    pop() {
        if (this.tail === null) return undefined;
        this.size--;
        let node = this.tail;

        if (this.size === 0) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.at(this.size - 1);
            this.tail.next = null;
        }

        return node;
    }

    contains(value) {
        let node = this.head;

        while (node !== null) {
            if (node.value === value) {
                return true;
            }

            node = node.next;
        }

        return false;
    }

    find(value) {
        let node = this.head;
        let index = 0;

        while (index !== this.size) {
            if (node.value === value) {
                return index;
            }

            node = node.next;
            index++;
        }

        return null;
    }

    toString() {
        let result = "";
        let node = this.head;

        while (node !== null) {
            result += `( ${node.value} ) -> `;
            node = node.next;
        }

        result += "null";

        return result;
    }
}

class Node {
    value;
    next = null;

    constructor(value) {
        this.value = value;
    }
}

const list = new LinkedList();
list.append(5).append(21);
list.prepend(-1);

console.log(
    util.inspect(list, { showHidden: false, depth: null, colors: true })
);
console.log(list.size);
console.log(list.at(1));

console.log(list.find(21));

list.pop();

console.log(
    util.inspect(list, { showHidden: false, depth: null, colors: true })
);

console.log(list.toString());

console.log(list.contains(-12));
