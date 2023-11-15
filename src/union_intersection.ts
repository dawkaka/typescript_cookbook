type Dice = 1 | 2 | 3 | 4 | 5 | 6

let rolledDice: Dice = 1
function rollDice(input: 2 | 3 | 10) {
    if (isDice(input)) {
        rolledDice = input
    } else {
        input
    }
}

function isDice(value: number): value is Dice {
    return [1, 2, 3, 4, 5, 6].includes(value)
}

