export class StackObject {
    top = null;

    push(value) {
        this.top = { value, bottom: this.top };
        return this;
    }

    pop() {
        if (this.top === null)
            throw new ReferenceError("Cannot pop from empty stack");
        const value = this.top.value;
        this.top = this.top.bottom;
        return value;
    }
}

export class StackArray {
    stack = [];

    push(value) {
        this.stack.push(value);
        return this;
    }

    pop() {
        return this.stack.pop();
    }
}
