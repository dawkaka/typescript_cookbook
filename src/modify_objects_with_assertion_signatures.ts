function check(person: any) {
    person.checked = true;
}

const person = {
    name: "Stefan",
    age: 27,
};

check(person); // person now has the checked property
person.checked;



/**
 * To solve this we can use type predicates
 */

function check2<T>(person: T): person is T & { checked: boolean } {
    (person as T & { checked: boolean }).checked = true
    return true
}

const p2 = {
    name: "Stefan",
    age: 27,
}

if (check2(p2)) {
    p2.checked // we now have access to it's checked property
}

// Alternatively we can use assert in typsrcipt to avoid having to return boolean from check2 fuction
// Typescript's assert is designed to modell node js's assert function which assert a condition and throw an error if false

// Eg
// assert if a value is a number

function assertNumber(val: any): asserts val is number {
    if (typeof val !== "number") {
        throw Error("value is not a number");
    }
}

// Modifying our check function

function check3<T>(person: T): asserts person is T & { checked: boolean } {
    (person as T & { checked: boolean }).checked = true
}

const p3 = {
    name: "Stefan",
    age: 27
}
check3(p3)

p3.checked

// We didn't have to put it in an if statement
