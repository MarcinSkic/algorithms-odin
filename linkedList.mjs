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

    insertAt(value, index) {
        if (index > this.size - 1) return undefined;
        let node = this.head;

        while (index !== 1) {
            node = node.next;
            index--;
        }

        const newNode = new Node(value);
        newNode.next = node.next;
        node.next = newNode;
    }

    removeAt(index) {
        if (index > this.size - 1) return undefined;
        let node = this.head;

        while (index !== 1) {
            node = node.next;
            index--;
        }

        node.next = node.next.next;
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

console.log(list.toString());
console.log({ size: list.size });
console.log({ "at(1)": list.at(1) });
console.log({ "find(21)": list.find(21) });
console.log({ "contains(21)": list.contains(21) });

console.log({ popped: list.pop() });

console.log(list.toString());

console.log({ "contains(-12)": list.contains(-12) });

list.append(124).append(675).append(32).append(74).append(534);
console.log(list.toString());

list.removeAt(2);
console.log(list.toString());
list.insertAt(666, 4);
console.log(list.toString());
