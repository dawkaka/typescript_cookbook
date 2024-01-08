type PersonS = {
    name: string;
    age: number;
    hello: () => string;
};

// we want to create a serializable version of the above type
// i.e get rid of function
// we want that if an object as a serialize property the type should be the return type of that function instead

// for removing function we can use the remove type in remove_specific_object_properties.ts

type SerializePerson = Remove<PersonS, (...ars: any[]) => any> // this works


// but what about nested objects

type PersonNested = {
    name: string;
    age: number;
    profession: {
        title: string;
        level: number;
        printProfession: () => void;
    };
    hello: () => string;
}

type SerializeNestedPerson = Remove<PersonNested, Function>
// you can see that we still ahve the printProfession property 
// which means the type is not serializable
// we need a way to this this recursively 

type NestedSerialize<T> = {
    [K in keyof T]: T[K] extends object ? Serialize<T[K]> : T[K]
}

type Serialize<T> = T extends { serialize(): any } ? ReturnType<T["serialize"]> : NestedSerialize<Remove<T, Function>>

type NestedPerson = Serialize<PersonNested>

class Serializer {
    constructor() { }
    serialize<T>(obj: T): Serialize<T> {
        const ret: Record<string, any> = {};

        for (let k in obj) {
            if (typeof obj[k] === "object") {
                ret[k] = this.serialize(obj[k]);
            } else if (typeof obj[k] !== "function") {
                ret[k] = obj[k];
            }
        }
        return ret as Serialize<T>;
    }
}

const persons: PersonNested = {
    name: "Stefan",
    age: 40,
    profession: {
        title: "Software Developer",
        level: 5,
        printProfession() {
            console.log(`${this.title}, Level ${this.level}`);
        },
    },
    hello() {
        return `Hello ${this.name}`;
    },
};

const serializer = new Serializer();
const serializedPerson = serializer.serialize(persons);


type PersonWithSerializeMethod = {
    name: string;
    age: number;
    serialize(): `${string}-${number}`
}
const p: PersonWithSerializeMethod = { name: "yussif", age: 24, serialize: function () { return `${this.name}-${this.age}` } }

const ser = new Serializer()
const serP = ser.serialize(p) // type  of serP is `${string}-${number}`