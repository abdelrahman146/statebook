import { Observable } from 'rxjs';

export type State<T = unknown> = {
    status: StatusObject;
    loaded?: boolean;
    data?: T;
};

export type StatusObject = {
    info?: boolean | string;
    warning?: boolean | string;
    success?: boolean | string;
    error?: boolean | string;
    loading?: boolean | string;
};

export type Status = 'info' | 'warning' | 'success' | 'success' | 'error' | 'loading';

export type Statebook<T> = {
    state: State<T>;
    asObservable: () => Observable<State<T>>;
    setStatus: (status: Status, value: string | boolean) => void;
    setData: (data: T) => void;
    setLoaded: (flag: boolean) => void;
    resetStatus: () => void;
    flush: () => void;
};

export type LocalStatebook<T> = {
    state: State<T>;
    setStatus: (status: Status, value: string | boolean) => void;
    setData: (data: T) => void;
    setLoaded: (flag: boolean) => void;
    resetStatus: () => void;
    flush: () => void;
};
