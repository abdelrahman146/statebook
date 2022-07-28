export type Subscription<T> = (state: T, status: Status) => void;
export type Status = {
    info?: string | boolean;
    warning?: string | boolean;
    error?: string | boolean;
    success?: string | boolean;
    loading?: string | boolean;
};
