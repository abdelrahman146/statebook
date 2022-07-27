import { BehaviorSubject } from 'rxjs';
import { State, StatebookFactoryOptions } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Statebook<T extends { [subjectId: string]: any }> = { [subjectId in keyof T]: BehaviorSubject<State<T[subjectId]>> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkLoaded = (data: any) => {
    if (Array.isArray(data)) return data.length > 0;
    if (typeof data === 'object') return Object.keys(data).length > 0;
    return Boolean(data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createStatebook<T extends { [subjectId: string]: any }>(initialStates: T, options?: StatebookFactoryOptions) {
    const statebook: Statebook<T> = {} as Statebook<T>;
    for (const subjectId of Object.keys(initialStates)) {
        statebook[subjectId as keyof T] = new BehaviorSubject<State<T[keyof T]>>({
            status: {},
            data: initialStates[subjectId],
            loaded: checkLoaded(initialStates[subjectId]),
        });
    }

    return {
        useSubject: (subjectId: keyof Statebook<T>) => {
            if (!statebook[subjectId]) throw new Error(`Statebook: Cannot find subject "${String(subjectId)}, please add it to the initial state"`);
            const subject: Statebook<T>[keyof T] = statebook[subjectId];
            return {
                state: () => subject.getValue().data,
                status: () => subject.getValue().status,
                isLoaded: () => subject.getValue().loaded,
                observable: () => subject.asObservable(),
                setState: (data: Partial<T[keyof T]>) => {
                    const state = subject.getValue();
                    if (typeof state.data === 'object') {
                        let newState: State<T[keyof T]> = { ...state, data: { ...state.data, ...data } };
                        newState = Object.keys(newState.data).length > 0 ? { ...newState, loaded: true } : { ...newState, loaded: false };
                        subject.next(newState);
                    }
                },
            };
        },
    };
}
