import { first } from 'rxjs';
import { Statebook, State } from '../types';
import { syncStatus } from './syncStatus';

export function awaitStatebook<T, K>(statebook: Statebook<T>, condition: (state: State<T>) => boolean, syncstatus?: Statebook<K>): Promise<State<T>> {
    const sub = syncstatus ? syncStatus(statebook, syncstatus) : null;
    const state$ = statebook.asObservable();

    return new Promise((resolve, reject) => {
        try {
            state$.pipe(first(condition)).subscribe((value) => {
                if (sub) sub.unsubscribe();
                resolve(value);
            });
        } catch (error) {
            if (sub) sub.unsubscribe();
            reject(error);
        }
    });
}
