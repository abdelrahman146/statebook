import { statebook } from "../statebook";
import { useState, useEffect } from "react";
import { Statebook } from "../types";

export function useGlobalStatebook<T>(id: string): Statebook<T> {
    const book = statebook<T>(id);
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
