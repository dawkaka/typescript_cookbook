/**
 * Problem: You have a union of different types but you want to filter just certain types. 
 * eg: all sub-types of string
 */


type ElementList = {
    addClass: (c: string) => ElementList;
    removeClass: (c: string) => ElementList;
    on: (event: string, callback: (e: Event) => void) => ElementList;
    length: number;
    [x: number]: HTMLElement
}

declare const myCollection: ElementList;

myCollection
    .addClass("toggle-off")
    .removeClass("toggle-on")
    .on("click", (e) => { });


myCollection[0]


// from the above ElementList type the type of keyof ElementList is a union
// like so: "addClass" | "removeClass" | "on" | "length" | number

// we don't want a single eleemnt to be change directly using index access
// we want to make sure that we can make changes to individual elements outside of myCollection

myCollection[0].classList.add("we-dont-want-this") // we don't want this

// we can use a conditional type to get only sub-types of string from the union

type JustStrings<T> = T extends string ? T : never;

type CollectionStrings = JustStrings<keyof ElementList>
// ideally the type of collection strings is  "addClass" | "removeClass" | "on" | "length" | never
// But in a union type the never is dropped so the type of CollectionStrings becomes
//"addClass" | "removeClass" | "on" | "length" 

// We can now create a safe collection from using the above helper types and the Pick type

type SafeCollection = Pick<ElementList, JustStrings<keyof ElementList>>

// SafeCollection will not allow accessing individual elements of the collection

declare const myCollection2: SafeCollection;

myCollection2
    .addClass("toggle-off")
    .removeClass("toggle-on")
    .on("click", (e) => { });


// @ts-expect-error
myCollection2[0].classList.add("uncomment-to-see-error-message")
