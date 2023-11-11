
function task(name: string, dependencies: string[]): void
function task(name: string, callBack: () => void): void
function task(name: string, param2: string[] | (() => void), param3?: () => void): void {
    // function body here
}



/**
 * When you have different return types, you have to make sure to take care of that yourself
 * Eg
 */

function stringOrNumber(val: number): number
function stringOrNumber(val: string): string
function stringOrNumber(val: string | number): string | number {
    if (typeof val === "number") {
        return "Hello"
    } else {
        return 2
    }
}

let str: number = stringOrNumber(2)
console.log(str) // => "Hello"

let num: string = stringOrNumber("HI")
console.log(num) // => 2

// In the above examples the type are wrong but typescript doesn't error
