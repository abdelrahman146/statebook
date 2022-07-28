import { Topic } from '../Topic';

export class TopicArray<T> extends Topic<Array<T>> {
    push(...items: T[]) {
        this.state = [...this.state, ...items];
    }

    concat(...items: ConcatArray<T>[]) {
        this.state = this.state.concat(...items);
        this.state.filter;
    }

    fill(value: T, start?: number, end?: number) {
        this.state = this.state.fill(value, start, end);
    }

    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S) {
        this.state = this.state.filter(predicate);
    }

    slice(start?: number, end?: number) {
        this.state = [...this.state.slice(start, end)];
    }

    splice(start: number, deleteCount?: number): void;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    splice(start: number, deleteCount: number, ...items: T[]) {
        this.state = [...this.state.splice(start, deleteCount, ...items)];
    }

    sort(compareFn?: (a: T, b: T) => number) {
        this.state = [...this.state.sort(compareFn)];
    }

    reverse() {
        this.state = [...this.state.reverse()];
    }

    pop() {
        this.state.splice;
        // TODO
    }

    shift() {
        const [_first, ...rest] = this.state;
        this.state = rest;
    }

    unshift(...items: T[]) {
        this.state = [...items, ...this.state];
    }
}
