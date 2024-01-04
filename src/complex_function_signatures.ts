type StringLabel = {
    name: string;
}

type NumberLabel = {
    id: number;
}

function createLabel(input: number): NumberLabel
function createLabel(input: string): StringLabel
function createLabel(input: string | number): StringLabel | NumberLabel {
    if (typeof input === "number") {
        return { id: input }
    }
    return { name: input }
}

const v = createLabel("hee")
const n = createLabel(2)

// the above works but there is on issue, when we are passing
// a value whose type is either string or number in cases where we can't narrow down the type to either string or number 
// the function errors
// as seen below

function checkString(input: string | number) {
    return createLabel(input)
}
// we get a `No overload matches this call ...`  
// this is because the last function in the overload is where we actually implement the function and it's not part of the function signatures

// to add the ability to handle string | number inputs we need to add that signature to the overload as well


function createLabel2(input: number): NumberLabel
function createLabel2(input: string): StringLabel
function createLabel2(input: string | number): NumberLabel | StringLabel
function createLabel2(input: string | number): StringLabel | NumberLabel {
    if (typeof input === "number") {
        return { id: input }
    }
    return { name: input }
}

const v2 = createLabel2("hee")
const n2 = createLabel(2)

function checkOverload(input: string | number) {
    return createLabel2(input) // now this works
}

// but the problem with the above implementation is that we don't have type narrowing when we pass string | number

const num_or_str = checkOverload(2)
// type of num_or_str is `StringLabel | NumberLable`
// we want to to able to narrow it down such that if a number is passed the return type is NumberLabel and if a string is passed the return type is StringLabel

/**
 * You'll notice that the function overload get bigger and bigger as we add more types
 * for example if we want the createLabel function to accept labels (NumberLabel or StringLabel) we'll need to add that to the fucntion overload as well
 *  as shown below
 */

function createLabel3(input: number): NumberLabel
function createLabel3(input: string): StringLabel
function createLabel3(input: string | number): NumberLabel | StringLabel
function createLabel3(input: StringLabel): StringLabel
function createLabel3(input: NumberLabel): NumberLabel
function createLabel3(input: string | number | StringLabel | NumberLabel): StringLabel | NumberLabel {
    if (typeof input === "number") {
        return { id: input }
    }
    if (typeof input === "string") {
        return { name: input }
    }
    if ("id" in input) {
        return { id: input.id }
    }
    return { name: input.name }
}

// now if we  want to be able to accept types that are (StringLabel | NumberLabel) 
// we have to add and overload for that
// if we want (string | StringLabel) or (numer | NumberLabel) we hae to add overloads for those too
// and so on. and the whole function becomes really complex.

// To fix this, we can use a tool in typescript's toolbox called condition types
// Conditional types allow us to select a type based on certain sub-type checks. 

// Example to check if a type is a string
// If string we return string type if the generic type is String otherwise we treturn never

type IsString<T> = T extends string ? string : never;

type A = IsString<"hello"> // type of A is string
type B = IsString<4> // type of B is never
type C = IsString<"Hello" | "World">; // string


// We can you the conditional types technique to write a better GetLabel type
// like so

type GetLabel<T> = T extends string | StringLabel ? StringLabel : T extends number | NumberLabel ? NumberLabel : never

// We can then add a generic type T to our createLabel function and then return a GetLabel<T> type

function createLabel4<T extends number | string | StringLabel | NumberLabel>(
    input: T
): GetLabel<T> {
    if (typeof input === "number") {
        return { id: input } as GetLabel<T>;
    } else if (typeof input === "string") {
        return { name: input } as GetLabel<T>;
    } else if (typeof input === "object" && "id" in input) {
        return { id: input.id } as GetLabel<T>;
    } else {
        return { name: input.name } as GetLabel<T>;
    }
}


const v4 = createLabel4("hee")
const n4 = createLabel4(2)

let num_str: string | number = 2
const num_or_str2 = createLabel4(num_str) // we get number label

// Simpler with better type narrowing but we still had to do type assertions 
// A work around is to combine conditional types with function overload
// like so

function createLabel5<T extends number | string | StringLabel | NumberLabel>(
    input: T
): GetLabel<T>;
function createLabel5(
    input: number | string | StringLabel | NumberLabel
): NumberLabel | StringLabel {
    if (typeof input === "number") {
        return { id: input };
    } else if (typeof input === "string") {
        return { name: input };
    } else if ("id" in input) {
        return { id: input.id };
    }
    return { name: input.name }
}

const v5 = createLabel5("hee")
const n5 = createLabel5(2)

const num_or_str5 = createLabel4(num_str)

// same thing  but without the need to assert types