class StackObject {
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

class StackArray {
    stack = [];

    push(value) {
        this.stack.push(value);
        return this;
    }

    pop() {
        return this.stack.pop();
    }
}

const stackObject = new StackObject();

stackObject.push(5).push(56).push(17);

console.log(stackObject);

stackObject.pop();
stackObject.pop();
stackObject.pop();

console.log(stackObject);

const stackArray = new StackArray();

stackArray.push(5).push(56).push(17);

console.log(stackArray);

stackArray.pop();
stackArray.pop();
stackArray.pop();

console.log(stackArray);
