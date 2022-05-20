import { first } from 'rxjs';
import { Statebook, State } from '../types';

export function awaitStatebook<T>(statebook: Statebook<T>, condition: (state: State<T>) => boolean): Promise<State<T>> {
    const state$ = statebook.asObservable();

    return new Promise((resolve, reject) => {
        try {
            state$.pipe(first(condition)).subscribe((value) => resolve(value));
        } catch (error) {
            reject(error);
        }
    });
}