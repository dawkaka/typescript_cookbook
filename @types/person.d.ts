export interface Person {
    name: string,
    age: number
}

export interface Student extends Person {
    semester: number
}