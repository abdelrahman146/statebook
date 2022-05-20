import { useState } from "react";
import { LocalStatebook, State, Status, StatusObject } from "../types";

export function useLocalStatebook<T>(data?: T): LocalStatebook<T> {
    const [state, setState] = useState<State<T>>({ status: {}, data });

    return {
        state,
        setStatus(status: Status, value: string | boolean) {
            const newStatus: StatusObject = {};
            for (const s in state.status) {
                if (s !== status) delete newStatus[s as keyof StatusObject];
            }
            newStatus[status] = value;
            setState({ ...state, status: { ...newStatus } });
        },
        setData(data: T) {
            setState((state) => ({ ...state, data }));
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
