/**
 * Interfaces allow for declarative merging but type aliases dont'
 * 
 * What this means is that you can extend the properties of an interface
 * even after it has been declared
 * 
 */

interface Person2 {
    name: string;
}

interface Person2 {
    age: number
}

// Person2 now has a type of {name: string, age:number}

let bro: Person2 = { name: "hell", age: 2 }

// Assuming the first interface was in a different file (say a library)
// This could cause unexpected problems
// Because typescript won't tell you you're extending an already declared interface


// Eg 
// FormData is an already declared interface (because it's a DOM API)
// And now we're extending it

interface FormData {
    name: string,
    age: number,
    address: string[]
}

let data = { name: "Dawkaka", age: 3, address: ["es", "ss"] }

function sendData(data: FormData) {
    // Now the formData we have here is a combination of the existing FormData interface
    // And now plus (name, age and address)
    data.entries()
}

/**
 * Typescript would error when you create duplicate types
 */

type FormData = {}
