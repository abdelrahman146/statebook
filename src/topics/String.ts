import { Topic } from '../Topic';

export class TopicString extends Topic<string> {
    replace(searchValue: string | RegExp, replaceValue: string) {
        this.state = this.state.replace(searchValue, replaceValue);
    }

    concat(...strings: string[]) {
        this.state = this.state.concat(...strings);
    }

    slice(start?: number | undefined, end?: number | undefined) {
        this.state = this.state.slice(start, end);
    }

    toLowerCase() {
        this.state = this.state.toLowerCase();
    }

    toUpperCase() {
        this.state = this.state.toUpperCase();
    }

    trim() {
        this.state = this.state.trim();
    }

    trimStart() {
        this.state = this.state.trimStart();
    }

    trimEnd() {
        this.state = this.state.trimEnd();
    }
}
