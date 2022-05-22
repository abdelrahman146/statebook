import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { Statebook } from '../types';

export function syncStatus<T, K>(from: Statebook<T>, to: Statebook<K>): Subscription {
    const from$ = from.asObservable();
    const subscription = from$
        .pipe(
            map(({ status }) => status),
            distinctUntilChanged()
        )
        .subscribe(({ error, info, loading, success, warning }) => {
            if (error) to.setStatus('error', error);
            if (info) to.setStatus('info', info);
            if (loading) to.setStatus('loading', loading);
            if (success) to.setStatus('success', success);
            if (warning) to.setStatus('warning', warning);
        });

    return subscription;
}
