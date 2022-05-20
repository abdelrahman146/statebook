import { BehaviorSubject } from "rxjs";
import { Statebook, State, Status, StatusObject } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const books: { [key: string]: BehaviorSubject<State<any>> } = {};

export function statebook<T>(id: string): Statebook<T> {
    let book: BehaviorSubject<State<T>>;

    if (books[id]) {
        book = books[id];
    } else {
        book = new BehaviorSubject<State<T>>({ status: {} });
        books[id] = book;
    }

    return {
        state: book.getValue(),
        asObservable() {
            return book.asObservable();
        },
        setStatus(status: Status, value: string | boolean) {
            const newStatus: StatusObject = {};
            const state = book.getValue();
            for (const s in state.status) {
                if (s !== status) delete newStatus[s as keyof StatusObject];
            }
            newStatus[status] = value;
            book.next({ ...state, status: { ...newStatus } });
        },
        setData(data: T) {
            const state = book.getValue();
            book.next({ ...state, data });
        },
        setLoaded(flag: boolean) {
            const state = book.getValue();
            book.next({ ...state, loaded: flag });
        },
        resetStatus() {
            const state = book.getValue();
            book.next({ ...state, status: {} });
        },
        flush() {
            book.next({ status: {} });
        },
    };
}
