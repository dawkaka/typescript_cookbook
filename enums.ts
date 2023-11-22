enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

function move(direction: Direction) {
}

move(Direction.Up);

/**
 * enums  in typescreipt are syntactic extension of javascript which means they work on the type level
 * and also emit javascript code.
 * the above enum Direction emits this js code
 * var Direction;
   (function (Direction) {
       Direction[Direction["Up"] = 0] = "Up";
       Direction[Direction["Down"] = 1] = "Down";
       Direction[Direction["Left"] = 2] = "Left";
       Direction[Direction["Right"] = 3] = "Right";
   })(Direction || (Direction = {}));
 * 
   
   when you log Direction you get: {0: 'Up', 1: 'Down', 2: 'Left', 3: 'Right', Up: 0, Down: 1, Left: 2, Right: 3}
 */

/**
 * The problem with this is that in large codebases where you have a lot of enums
 * It could signficantly increase you bundle size.
 * To get around that, you can use const enums.
 * when you do that typeScript tries to substitute the usage with the actual values instead of emitting js code
 * therefore not increasing bundle size
 */
const enum Direction2 {
    Up,
    Down,
    Left,
    Right
}

function move2(direction: Direction2) {
    console.log(direction);
}

move2(Direction2.Up);

/**
 * For direction two typescript only replaces `Direction2.Up` with it's value (0)
 * Without emitting any js code like Direction
 * Check enums.js file to see the difference
 */

enum Traits {
    None,              // 0000
    Friendly = 1,      // 0001 or 1 << 0
    Mean = 1 << 1, // 0010
    Funny = 1 << 2, // 0100
    Boring = 1 << 3, // 1000
}

let aPersonsTraits = Traits.Mean | Traits.Funny;

if ((aPersonsTraits & Traits.Mean) === Traits.Mean) {
    // Person is mean, amongst other things

}
