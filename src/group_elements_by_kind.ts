// checke the group type in generatiing_new_objects.ts file
type GroupedToys = Partial<Group<Toy, "kind">>;

/**
 * The problem with this type is that it's too broad
 * why should the boardgame group have a type of Toy[] instead of BoardGame
 * same for doll, puzzle and bricks?
 * 
 * type GroupedToys = {
      boardgame?: BoardGame[] | undefined;
      puzzle?: Puzzle[] | undefined;
      doll?: Doll[] | undefined;
      bricks?: Bricks[] | undefined;
    };
 */
type GroupBetter<Collection extends Record<string, any>, Selector extends keyof Collection> = {
    [K in Collection[Selector]]: Extract<Collection, { [S in Selector]: K }>[]
}

type GroupedToysBetter = Partial<GroupBetter<Toy, "kind">>


function groupToyss(toys: Toy[]): GroupedToysBetter {
    let group: GroupedToysBetter = {};
    for (let toy of toys) {
        addToGroup(group, toy.kind, toy);
    }
    return group
}


function addToGroup<G extends Record<string, K[]>, S extends keyof G, K>(group: G, kind: S, value: K) {
    group[kind] = group[kind] ?? [];
    group[kind].push(value)
}