import { Status, Subscription } from './types';

export abstract class Topic<T> {
    private subs: Subscription<T>[] = [];
    private _status: Status = {};
    private init: T;

    constructor(private _state: T) {
        this.init = _state;
    }

    get state() {
        return this._state;
    }

    set state(state: T) {
        if (state === this._state) return;
        this._state = state;
        this.publish();
    }

    get status() {
        return this._status;
    }

    setStatus(status: keyof Status, value: string | boolean) {
        this._status = { [status]: value };
        this.publish();
    }

    resetStatus() {
        this._status = {};
    }

    reset() {
        this.resetStatus();
        this.state = this.init;
    }

    subscribe(sub: Subscription<T>) {
        sub(this.state, this.status);
        this.subs.push(sub);

        return { unsubscribe: () => this.unsubscribe(sub) };
    }

    private unsubscribe(sub: Subscription<T>) {
        this.subs.filter((subscription) => subscription !== sub);
    }

    private publish() {
        for (const sub of this.subs) {
            sub(this.state, this.status);
        }
    }

    toString() {
        return String(this.state);
    }
}
