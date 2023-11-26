// Using any or unknown as type for function parameters make it behave like a generic
// In thte sense that you can pass different types


function pairs(a: unknown, b: unknown): [unknown, unknown] {
    return [a, b];
}

const a = pairs(1, "1");


// The problem with the above is that type information is lost
// the type of `a` is [unknown, unknown]
// Which isn't very useful 
// But with generics we can pass different types to a function and still not lose type information

function pairsG<A, B>(a: A, b: B): [A, B] {
    return [a, b]
}

const genericA = pairsG(1, "1") // type of genericA is  [number, string]
const genericB = pairsG<"a", 25>("a", 25)  // type of genericB is ["a", 25]