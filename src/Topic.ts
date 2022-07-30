import { Status, Subscription } from './types';
import { createKey } from './utils';

export abstract class Topic<T = any> {
    private subs: { [subKey: string]: Subscription<T> } = {};
    private status: Status = {};
    private init: T;

    constructor(protected state: T) {
        this.init = state;
    }

    getState(): T {
        return JSON.parse(JSON.stringify(this.state));
    }

    setState(state: T) {
        if (state === this.state) return;
        this.state = state;
        this.publish();
    }

    getStatus() {
        return Object.freeze(this.status);
    }

    setStatus(status: keyof Status, value: string | boolean) {
        this.status = { [status]: value };
        this.publish();
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
        const subKey = createKey();
        this.subs[subKey] = sub;
        return { unsubscribe: () => this.unsubscribe(subKey) };
    }

    private unsubscribe(subKey: string) {
        delete this.subs[subKey];
    }

    private publish() {
        for (const key in this.subs) {
            this.subs[key](this.getState(), this.getStatus());
        }
    }

    toString() {
        return String(this.state);
    }
}
