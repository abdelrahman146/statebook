import { Status, Subscription } from './types';

export abstract class Topic<T = any> {
    private subs: { [subKey: number]: Subscription<T> } = {};
    private status: Status = {};
    private init: T;
    private index = 0;

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
        const subKey = this.index++;
        this.subs[subKey] = sub;
        return { unsubscribe: () => this.unsubscribe(subKey) };
    }

    private unsubscribe(subKey: number) {
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
