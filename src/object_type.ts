/**Primitives
 * number, number enum, boolean, string, string enum, symbol, unique symbol
 */

/**Compound types
 * object, array, function, regex, class, tuple, 
 */




// The Three object types: {}, Object and object

// We'll use this object for demo later
// Notice how the toString returns a number instead
let demoOb = { toString: () => { return 4 } }


/**
 * The {} allows for all types except null and undefined
*/

let ob: {}
ob = 2
ob = "Hello"
ob = false
ob = function hello() { console.log("hello world") }
ob = { name: "John Doe", country: "Ghana" }
ob = /.*/
ob = ["20", 2, { foo: "bar" }]
ob = class name {
}

ob = demoOb // This works for {} 
// Below lines however fail
ob = null
ob = undefined


/**
 * The Object type is an interface created in typescript.
 * All types that implement the standard javascript object interface are compatible with the Object type
 *
 */


let ob2: Object
ob2 = 2
ob2 = "Hello"
ob2 = true
ob2 = function hello() { console.log("hello world") }
ob2 = { name: "John Doe", country: "Ghana" }
ob2 = /.*/
ob2 = ["20", 2, { foo: "bar" }]
ob2 = class name {
}
ob2 = demoOb // this fails because the default toString function on objects returns a string not a number and hence doesn't implement the Object interface
ob2 = null
ob2 = undefined


/**
 * The object type is basically all non primitive types
 */

let ob3: object
ob3 = function hello() { console.log("hello world") }
ob3 = { name: "John Doe", country: "Ghana" }
ob3 = /.*/
ob3 = ["20", 2, { foo: "bar" }]
ob3 = class name {
}
ob3 = demoOb
// These primtives types and (null + undefined) fail
ob3 = 2
ob3 = "Hello"
ob3 = true
ob3 = null
ob3 = undefined





