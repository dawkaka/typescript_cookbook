type EventName = `on${string}`

type EventObject<T> = {
    val: T
}

type EventCallBack<T = any> = (event: EventObject<T>) => void


type EventRegister = {
    [x: EventName]: EventCallBack[]
}

class EventSystem {
    register: EventRegister = {}
    addEventListener(name: EventName, cb: EventCallBack) {
        this.register[name] = this.register[name] ?? []
        this.register[name].push(cb)
    }
    triggerEvent(ev: EventName, value: any) {
        const cbs = this.register[ev] ?? []
        cbs.forEach(cb => {
            cb(value)
        })
    }
}


const sys = new EventSystem()

sys.addEventListener("onClick", (ev) => { console.log("triggerd") })
// using any event name that doesn't start with `on` doesn't work!
