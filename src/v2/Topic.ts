import { Status } from "./types";


export class Topic<T> {
    private subs: Transformer<T>[];
    private state: T;
    private status: Status;

    constructor(private initState: T) {
        this.subs = [];
        this.state = initState;
        this.status = {};
    }

    currentState() {
        return this.state;
    }

    subscribe(subscriber: Transformer<T>) {
        this.subs.push(subscriber);
        return this.unsubscribe.bind(subscriber);
    }

    unsubscribe(subscriber: Transformer<T>) {
        this.subs = this.subs.filter((sub) => sub !== subscriber);
    }

    setState(state: T) {
        this.state = state;
        this.publish();
    }

    setStatus(status: keyof Status, value: boolean | string) {
        this.status = {[status]: value};
        this.publish();
    }

    resetStatus() {
        this.status = {};
        this.publish();
    }

    reset() {
        this.state = this.initState;
        this.status = {};
        this.publish();
    }

    private isStateLoaded() {
        if (Array.isArray(this.state)) return this.state.length > 0;
        if (typeof this.state === 'object') return Object.keys(this.state).length > 0;
        return Boolean(this.state);
    }

    private publish() {
        for (const sub of this.subs) sub(this.state, this.status, this.isStateLoaded());
    }
}
