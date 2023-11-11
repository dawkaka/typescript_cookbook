/**
 * They are both top types with means every value is compatible with them
 * `any` is compatible with every sub-type except never. You can narrow the set of possible values by assigning a new type
 * 
 */

const me: any = "Hello world"

const myName: string = me // this is fine



const mee: unknown = me

const name2: string = typeof mee == "string" ? mee : "" // need to check the type else won't works
