import { useState } from 'react';
import { Data, LocalStatebook, State, Status, StatusObject } from '../types';

export function useLocalStatebook<T extends Data>(data?: T): LocalStatebook<T> {
    const [state, setState] = useState<State<T>>({ status: {}, ...(data ? {data, loaded: true} : {}) });

    return {
        state,
        setStatus(status: Status, value: string | boolean) {
            const newStatus: StatusObject = {};
            for (const s in state.status) {
                if (s !== status) delete newStatus[s as keyof StatusObject];
            }
            newStatus[status] = value;
            setState((state) => ({ ...state, status: { ...newStatus } }));
        },
        setData(value: Partial<T>) {
            setState((state) => {
                const nextState: State<T> = { ...state, data: {...state.data, ...value} } as State<T>;
                if(nextState.data && Object.keys(nextState.data).length > 0) { return { ...nextState, loaded: true }}
                return {...nextState, loaded: false};
            });
        },
        isLoaded() {
            return Boolean(state.loaded);
        },
        setLoaded(flag: boolean) {
            setState((state) => ({ ...state, loaded: flag }));
        },
        resetStatus() {
            setState((state) => ({ ...state, status: {} }));
        },
        flush() {
            setState(() => ({ status: {} }));
        },
    };
}
