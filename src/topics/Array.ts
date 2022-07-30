import { Topic } from '../Topic';

export default class TopicArray<T> extends Topic<Array<T>> {
    push(...items: T[]) {
        this.setState([...this.state, ...items]);
    }

    concat(...items: ConcatArray<T>[]) {
        this.setState(this.state.concat(...items));
    }

    fill(value: T, start?: number, end?: number) {
        this.setState(this.state.fill(value, start, end));
    }

    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S) {
        this.setState(this.state.filter(predicate));
    }

    slice(start?: number, end?: number) {
        this.setState((this.state = [...this.state.slice(start, end)]));
    }

    splice(start: number, deleteCount?: number): void;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    splice(start: number, deleteCount: number, ...items: T[]) {
        this.setState([...this.state.splice(start, deleteCount, ...items)]);
    }

    sort(compareFn?: (a: T, b: T) => number) {
        this.setState([...this.state.sort(compareFn)]);
    }

    reverse() {
        this.setState([...this.state.reverse()]);
    }

    pop() {
        this.setState([...this.state.slice(0, -1)]);
    }

    shift() {
        this.setState([...this.state.slice(1)]);
    }

    unshift(...items: T[]) {
        this.setState([...items, ...this.state]);
    }
}
