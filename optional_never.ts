type SelectBase = {
    options: string[]
}

type SingleSelect = SelectBase & {
    value: string
}

type MultiSelect = SelectBase & {
    values: string[]
}

type SelectProperties = SingleSelect | MultiSelect


function selectCallback(select: SelectProperties) {
    if ("value" in select) {
        // select is now narrowed to SingleSelect
    } else if ("values" in select) {
        // select is now narrowed to MultiSelect
    }
}

/**
 * The above works but the problem is when we pass an object with both values and value it works too
 * In that case what type are we really expecting ?
 */

selectCallback({ options: ["Hello"], values: ["Nice", "but"] }) // works
selectCallback({ options: ["Hello"], value: "maize" }) // works
selectCallback({ options: ["Hello"], value: "maize", values: ["Nice", "but"] }) // also works, but shouldn't !?!

/**
 * We can solve this by using the optional never technique
 */


type SelectBase2 = {
    options: string[]
}
type SingleSelect2 = SelectBase2 & {
    value: string,
    values?: never
}
type MultiSelect2 = SelectBase2 & {
    values: string[],
    value?: never
}

type SelectProperties2 = SingleSelect2 | MultiSelect2

function selectCallback2(select: SelectProperties2) {
    if ("value" in select) {
        // select is now narrowed to SingleSelect
    } else if ("values" in select) {
        // select is now narrowed to MultiSelect
    }
}

/**
 * Same as before but with a properties with a type of never and this solves the problem
 */

selectCallback2({ options: ["Hello"], values: ["Nice", "but"] }) // works
selectCallback2({ options: ["Hello"], value: "maize" }) // works
selectCallback2({ options: ["Hello"], value: "maize", values: ["Nice", "but"] }) // doesn't work !!! hurray !!!
