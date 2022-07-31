import { Status, Subscription } from './types';
import { cloneDeep, isEqual } from 'lodash';
export abstract class Topic<T = any> {
    private subs: { [subKey: number]: Subscription<T> } = {};
    private status: Status = {};
    private init: T;
    private index = 0;

    constructor(private state: T) {
        this.init = state;
    }

    get(): T {
        return cloneDeep(this.state);
    }

    set(state: T): void;
    set(fn: (state: T) => T): void;
    set(arg: T | ((state: T) => T)): void {
        let newState: T;
        if (typeof arg === 'function') {
            const fn = arg as (state: T) => T;
            newState = fn(this.get());
        } else {
            newState = arg;
        }
        if (isEqual(newState, this.state)) return;
        this.state = newState;
        this.next();
    }

    getStatus() {
        return Object.freeze(this.status);
    }

    setStatus(status: keyof Status, value: string | boolean) {
        this.status = { [status]: value };
        this.next();
    }

    resetStatus() {
        this.status = {};
    }

    reset() {
        this.resetStatus();
        this.state = this.init;
    }

    subscribe(sub: Subscription<T>) {
        sub(this.state, this.status);
        this.subs;
        const subKey = this.index++;
        this.subs[subKey] = sub;
        return { unsubscribe: () => this.unsubscribe(subKey) };
    }

    private unsubscribe(subKey: number) {
        delete this.subs[subKey];
    }

    private next() {
        for (const key in this.subs) {
            this.subs[key](this.get(), this.getStatus());
        }
    }

    toString() {
        return String(this.state);
    }
}
