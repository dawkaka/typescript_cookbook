/**
 * This is kind of a descriminated union but instead of 
 * having a `kind` field for each object we make the `kind` a key that maps to the actual type
 * And then we can use the key as an index signature to get the actual type
 * So basically you take a string and then get a sub type based on that string
*/

// eg:
// if you have a function that creates a shape
// Shapes like circle, triangle, arrow, line, etc have different properties
// we can have a function that takes a string (name of shape) and return the corresponding shape
// with has the type of that particular shape
// We can use a type map for that where the key is the name of the shape and the value is the type of the shape

type Point = { x: number, y: number }
type Triangle = { w: number, h: number, angle?: `${number}deg` }
type Circle = { radius: number }
type Arrow = { start: Point, end: Point, headType?: "solid" | "regular" }
type Line = { start: Point, end: Point }


type AllShapes = {
    "triangle": Triangle,
    "circle": Circle,
    "arrow": Arrow,
    "line": Line
}
    & { [x: `shape-${string}`]: any } // For custom shapes


// now that we have our types out of the way, let create a function that creates the shapes
// **Shape extends keyof AllShapes** means that Shape is one of "triangle" "circle" "arrow" or "line"
// props: AllShapes[Shape] means props object should only contain the properties of the match Shape
// eg: if we say createShape("triangle") our props can only be {w:number,h:number} or {w:number,h:number, angle: "360deg"} but we cant pass any other object literal to the function
// And our funcion is returning a value that has a type of the matched Shape: AllShapes[Shape]

function createShape<Shape extends keyof AllShapes>(shape: Shape, props: AllShapes[Shape]): AllShapes[Shape] {
    return props
}

let c = createShape("circle", { radius: 4 })
let t = createShape("triangle", { h: 22, w: 22, angle: "15deg" })
let ar = createShape("arrow", { start: { x: 0, y: 0 }, end: { x: 10, y: 10 }, headType: "regular" })

// for custom shapes 
let vv = createShape("shape-trapezoid", {})