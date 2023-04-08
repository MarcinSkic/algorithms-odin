function contains(object, value) {
    if (object === value) {
        return true;
    } else if (typeof object !== "object") {
        return false;
    }

    for (obj of Object.values(object)) {
        if (contains(obj, value)) {
            return true;
        }
    }

    return false;
}

const nestedObject = {
    data: {
        info: {
            stuff: {
                thing: {
                    moreStuff: {
                        magicNumber: 44,
                        something: "foo2",
                    },
                },
                anotherShelf: {
                    withSecret: "secret",
                },
            },
        },
    },
};

console.log(contains(nestedObject, "secret"));
