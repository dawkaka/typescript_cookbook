/**
 * We already know how to remove properties by name
 * Let's look at how we remove properties based on their types
 */

type PersonT = { name: string, age: number, profession?: string }

// we want only properties with string types

type Select<O extends Record<string, any>, T> = {
    [K in keyof O as O[K] extends T | undefined ? K : never]: O[K]
}

type StringPerson = Select<PersonT, string>

// with this helper function we can remove all kinds of types
// eg  select all functions that return number from the String type

type NumFuncs = Select<String, (...args: any[]) => number>


// we can write a type to do the reverses

type Remove<O, T> = {
    [K in keyof O as O[K] extends T | undefined ? never : K]: O[K]
}

type RemoveStrings = Remove<PersonT, string>