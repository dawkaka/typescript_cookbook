

interface Component {
    render(): string
}

// we want to implement a router that takes 
// an array of routes (path, componet)

type Route = {
    path: string,
    component: Component
}

function router(routes: Route[]) {
    return {
        navigate: (path: string) => {

        }
    }
}
function Main() {
    return {
        render: () => {
            return "Main page"
        }
    }
}

function AboutPage() {
    return {
        render: () => {
            return "About page"
        }
    }
}

const r = router([{ path: "/", component: Main() }, { path: "/about", component: AboutPage() }])

r.navigate("") // we don't get autocompletion here

// let's try to fix this by using generics
// like so

function routerG<T extends Route>(routes: T[]) {
    return {
        navigate: (path: T["path"]) => {

        }
    }
}

const rr = routerG([{ path: "/", component: Main() }, { path: "/about", component: AboutPage() }])

rr.navigate("") // no autocompletion
//The problem is that we are working with objects and arrays,
// and TypeScript tends to widen types in objects and arrays to something more general to allow for the mutability of values.

// Now let's tell typescript the values are immutable

function routerGIM<T extends Route>(routes: readonly T[]) {
    return {
        navigate: (path: T["path"]) => { }
    }
}

const rrr = routerGIM([{ path: "/", component: Main() }, { path: "/about", component: AboutPage() }] as const)
rrr.navigate("/") // finally auto completion, and we need to add `as const` because typescript widens types for arrays and objects function parameter literals
// removing the as const get rid of autocompletion.

// The problem with the above is that we don't want users to have to add `as const` each time they are call our router function
// To fix this, Typescript allows use to add the const context to a generic, doing so allows as to get rid of as const each time we are calling 
// the router function

function routerGIMConst<const T extends Route>(routes: T[]) {
    return {
        navigate: (path: T["path"]) => { }
    }
}

const route = routerGIMConst([{ path: "/", component: Main() }, { path: "/about", component: AboutPage() }])

route.navigate("/") // now we get autocopmletion and we don't have to use `as const` each time we are calling the router function