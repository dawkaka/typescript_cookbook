type FilterRule = {
    field: string;
    operator: string;
    value: any;
};

type CombinatorialFilter = {
    combinator: "and" | "or";
    rules: FilterRule[]
}

type ChainFilter = {
    rules: (CombinatorialFilter | FilterRule)[]
}

type Filter = CombinatorialFilter | ChainFilter;

function reset<F extends Filter>(filter: F): F {
    const result = { ...filter }
    result.rules = []
    if ("combinator" in result) {
        result.combinator = "and"
    }
    // filter is ChainedFilter
    return result
}
const filter: CombinatorialFilter = { rules: [], combinator: "or" };
const resetFilter = reset(filter);

const fil: { combinator: string, rules: (CombinatorialFilter | FilterRule)[] } = { combinator: "Hello", rules: [] }
const res = reset(fil)

const onDemandFilter = reset({
    combinator: "and",
    rules: [],
    evaluated: true,
    result: false,
});
/* filter is {
    combinator: "and";
    rules: never[];
    evaluated: boolean;
    result: boolean;
}; */


type TreeItems = {
    id: string;
    children: TreeItems[];
    collapsed?: boolean;
}

function createRootItem<T extends TreeItems>(): T {
    return {
        id: "hello",
        children: []
    }
}

let item = createRootItem();

type BaseTreeItem = {
    id: "root";
    children: BaseTreeItem[]
}

type TreeItem<Children extends TreeItem = BaseTreeItem> = {
    id: string;
    children: Children[]
}

function attachToRoot<T extends TreeItem>(children: T[]): TreeItem<T> {
    return {
        id: "root",
        children
    }
}

let children = [{ id: "string", children: [], collpase: false }]

let root = attachToRoot(children)
