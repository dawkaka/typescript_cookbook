
type FnObj = Record<string, () => any>

type MapFnToProp<F extends FnObj> = {
    [K in keyof F]: ReturnType<F[K]>
}

type Options<Data, Computed extends FnObj, Method> = {
    data(this: {}): Data,
    computed: Computed & ThisType<Data>
    method: Method & ThisType<Data & MapFnToProp<Computed> & Method>
}


declare function create<Data, Computed extends FnObj, Method>(options: Options<Data, Computed, Method>): any

create({
    data() {
        return { firstName: "Yussif", lastName: "Mohammed" }
    },
    computed: {
        getName: function () {
            return `${this.firstName} ${this.lastName}`
        },
        getLastName: function () {
            return this.lastName
        }
    },
    method: {
        name: function () {
            this.getName.toLocaleLowerCase()
        }
    }
})

