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
    [k in Toy["kind"]]?: Toy[] // doing this means anytime we add a toy we dont' have to update the type of GroupToys
}

function groupToys(toys: Toy[]): GroupToys {
    let group: GroupToys = {};
    for (let toy of toys) {
        group[toy.kind] = group[toy.kind] ?? []
        group[toy.kind]?.push(toy)
    }
    return group
}


/////////////////////////////////

/**
 * This is a pattern that where we have a potential to generalize. Let’s create a Group type, that takes a collection and groups it by a specific selector. 
 * We want to create a generic type with two type parameters:
 * The Collection, can be anything.
 * The Selector, a key of Collection, so it can create the respective properties.
 */


type GroupToys2 = Group<Toy, "kind">;

type Group<Collection extends Record<string, any>, Selector extends keyof Collection> = {

    [x in Collection[Selector]]?: Collection[]

}

/**
 * Record is a built in type that returns an object type
 * Collection extends Record<string,any> means an object with string keys and any values
 * That also means out Selector which which extends the keyof Collection is also a subtype of string and hence a valid object key
 * If we didn't do this (making Collection extend Record) typescript will give us an error telling us that:
 * Collection[string] | Collection[number] | Collection[symbol] could result in anything, not just things that can be used as a key. 
 * As see below
 */

type Group2<Collection, Selector extends keyof Collection> = {
    // @ts-expect-error
    [x in Collection[Selector]]?: Collection[]

}

/**
 * However we can get the same result without extending the Record Type by using conditional types
 * As shown below
 */

type Group3<Collection, Selector extends keyof Collection> = {
    [k in Collection[Selector] extends string ? Collection[Selector] : never]: Collection[]
}

/**
 * Note: We removed the optional type modifier
 * This is because typescript has a built-in type for that called Partial
 * type Partial<T> = { [P in keyof T]?: T[P] };
 * It takes an object and makes every property optional
 */

// Our grouped toys type can look like this
type GroupedToys3 = Partial<Group3<Toy, "kind">>;