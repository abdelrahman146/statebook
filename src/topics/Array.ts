import { Topic } from '../Topic';

export default class TopicArray<T> extends Topic<Array<T>> {
    push(...items: T[]) {
        this.set((state) => [...state, ...items]);
    }

    concat(...items: ConcatArray<T>[]) {
        this.set((state) => state.concat(...items));
    }

    fill(value: T, start?: number, end?: number) {
        this.set((state) => state.fill(value, start, end));
    }

    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S) {
        this.set((state) => state.filter(predicate));
    }

    slice(start?: number, end?: number) {
        this.set((state) => [...state.slice(start, end)]);
    }

    splice(start: number, deleteCount?: number): void;
    splice(start: number, deleteCount: number, ...items: T[]): void;
    splice(start: number, deleteCount: number, ...items: T[]) {
        this.set((state) => [...state.splice(start, deleteCount, ...items)]);
    }

    sort(compareFn?: (a: T, b: T) => number) {
        this.set((state) => [...state.sort(compareFn)]);
    }

    reverse() {
        this.set((state) => [...state.reverse()]);
    }

    pop() {
        this.set((state) => [...state.slice(0, -1)]);
    }

    shift() {
        this.set((state) => [...state.slice(1)]);
    }

    unshift(...items: T[]) {
        this.set((state) => [...items, ...state]);
    }
}
