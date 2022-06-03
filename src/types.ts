import { Observable } from 'rxjs';

export type Data = {
    [key: string]: unknown;
}

export type State<T extends Data> = {
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

export type Statebook<T extends Data> = {
    state: State<T>;
    asObservable: () => Observable<State<T>>;
    setStatus: (status: Status, value: string | boolean) => void;
    setData: (data: Partial<T>) => void;
    isLoaded: () => boolean;
    setLoaded: (flag: boolean) => void;
    resetStatus: () => void;
    flush: () => void;
};

export type LocalStatebook<T extends Data> = {
    state: State<T>;
    setStatus: (status: Status, value: string | boolean) => void;
    setData: (data: Partial<T>) => void;
    isLoaded: () => boolean;
    setLoaded: (flag: boolean) => void;
    resetStatus: () => void;
    flush: () => void;
};
