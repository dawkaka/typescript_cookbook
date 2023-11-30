type ToyBase = {
    name: string;
    description: string;
    minimumAge: number;
};

type BoardGame = ToyBase & {
    kind: "boardgame";
    players: number;
};

type Puzzle = ToyBase & {
    kind: "puzzle";
    pieces: number;
};

type Doll = ToyBase & {
    kind: "doll";
    material: "plush" | "plastic";
};

type Bricks = ToyBase & {
    kind: "bricks",
    pieces: number;
    brand: string;
}

type Toy = Doll | Puzzle | BoardGame | Bricks;

type GroupToys = {
    [k in Toy["kind"]]?: Toy[]
}

function groupToys(toys: Toy[]): GroupToys {
    let group: GroupToys = {};
    for (let toy of toys) {
        group[toy.kind] = group[toy.kind] ?? []
        group[toy.kind]?.push(toy)
    }
    return group
}
