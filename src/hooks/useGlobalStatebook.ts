import { statebook } from "../statebook";
import { useState, useEffect } from "react";
import { Data, Statebook } from "../types";


export function useGlobalStatebook<T extends Data>(id: string): Statebook<T>;
export function useGlobalStatebook<T extends Data>(id: string, data?: T): Statebook<T>;
export function useGlobalStatebook<T extends Data>(id: string, data?: T): Statebook<T> {
    const book = statebook<T>(id, data);
    const [state, setState] = useState(book.state);

    useEffect(() => {
        const sub = book.asObservable().subscribe((currentState) => {
            setState(currentState);
        });

        return () => sub.unsubscribe();
    });

    return {
        ...book,
        state,
    };
}
