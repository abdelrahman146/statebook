export type Subscriber<T> = (state: T, status: Status, loaded: boolean) => void;
export type Status = {
    loading?: boolean | string;
    success?: boolean | string;
    warning?: boolean | string;
    info?: boolean | string;
    error?: boolean | string;
}