import { default as Array } from './Array';
import { default as String } from './String';
import { default as Number } from './Number';
import { default as Object } from './Object';

export const Topics = {
    String(init: string) {
        return new String(init || '');
    },
    Number(init: number) {
        return new Number(init || 0);
    },
    Array<T>(init: T[]) {
        return new Array(init);
    },
    Object<T extends { [key: string]: unknown }>(init: T) {
        return new Object(init);
    },
};
