import { Topic } from '../Topic';

export default class TopicString extends Topic<string> {
    replace(searchValue: string | RegExp, replaceValue: string) {
        this.set((state) => state.replace(searchValue, replaceValue));
    }

    concat(...strings: string[]) {
        this.set((state) => state.concat(...strings));
    }

    slice(start?: number | undefined, end?: number | undefined) {
        this.set((state) => state.slice(start, end));
    }

    toLowerCase() {
        this.set((state) => state.toLowerCase());
    }

    toUpperCase() {
        this.set((state) => state.toUpperCase());
    }

    trim() {
        this.set((state) => state.trim());
    }

    trimStart() {
        this.set((state) => state.trimStart());
    }

    trimEnd() {
        this.set((state) => state.trimEnd());
    }
}
