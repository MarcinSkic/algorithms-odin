import utils from "util";

export default class Queue {
    front = null;
    back = null;
    empty = true;

    enqueue(newValue) {
        const node = new QueueNode(newValue);

        if (this.front === null) {
            this.front = node;
            this.back = node;
        } else {
            this.back.next = node;
            this.back = node;
        }

        this.empty = false;
        return this;
    }

    dequeue() {
        const value = this.front.value;
        this.front = this.front.next;

        if (this.front === null) {
            this.back = null;
            this.empty = true;
        }

        return value;
    }
}

class QueueNode {
    value;
    next = null;

    constructor(value) {
        this.value = value;
    }
}
