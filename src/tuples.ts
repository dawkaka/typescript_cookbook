// Say you are working with an array that has a specific type each every index of the array
// And you want Typescript to be able to tell you that


let arr = ["hello", 2, "nice"] // typeof arr = (string | number)[]

let first = arr[0] // type of first = string | number. but first is clearly a string

let fourth = arr[3] //type of fours is also string | number. but the arrays length is just three.


// To achieve that level of type checking you need tuples 

let arr2: [string, number, string] = ["hello", 2, "nice"]

let first2 = arr2[0] // type of first2 is just string. Great
let fourth2 = arr2[3] // This errors because the length of the array is just three

//  we can even lable the items at each index eg.
let arr3: [name: string, age: number, occupation: string] = ["Dawkaka", 24, "Nurse"]
// label the fields is good for collaboration as hovering on it tells you want each index is

/**
 * You can pass tuples to functions as arguments
 * since every index correctly typed
 */

function printMe(name: string, age: number, occupation: string) {
    console.log(name, age, occupation)
}

printMe(...arr3) // this works!

// changing the position however doesn't work

function printUs(name: string, occupation: string, age: number) {
    console.log(name, age, occupation)
}
printUs(...arr3) // Error: Argument of type 'number' is not assignable to parameter of type 'string'