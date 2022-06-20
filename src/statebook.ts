import { BehaviorSubject } from 'rxjs';
import { Statebook, State, Status, StatusObject, Data } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const books: { [key: string]: BehaviorSubject<State<any>> } = {};

export function resetStatebook() {
    for(const book in books){
        books[book].next({ status: {} });
    }
}

export function statebook<T extends Data>(id: string): Statebook<T>;
export function statebook<T extends Data>(id: string, data?: T): Statebook<T>;
export function statebook<T extends Data>(id: string, data?: T): Statebook<T> {
    let book: BehaviorSubject<State<T>>;

    if (books[id]) {
        book = books[id];
    } else {
        book = new BehaviorSubject<State<T>>({ status: {}, ...(data ? {data, loaded: true} : {}) });
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
        setData(value: Partial<T>) {
            const state = book.getValue();
            const nextState: State<T> = { ...state, data: {...state.data, ...value} } as State<T>;
            nextState.data && Object.keys(nextState.data).length > 0 && book.next({ ...nextState, loaded: true });
            nextState.data && Object.keys(nextState.data).length === 0 && book.next({ ...nextState, loaded: false });
        },
        setLoaded(flag: boolean) {
            const state = book.getValue();
            book.next({...state, loaded: flag})
        },
        isLoaded() {
            const state = book.getValue();
            return Boolean(state.loaded);
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
