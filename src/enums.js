var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
function move(direction) {
}
move(Direction.Up);
function move2(direction) {
    console.log(direction);
}
move2(0 /* Direction2.Up */);
