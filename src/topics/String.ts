import { Topic } from '../Topic';

export default class TopicString extends Topic<string> {
    replace(searchValue: string | RegExp, replaceValue: string) {
        this.setState(this.state.replace(searchValue, replaceValue));
    }

    concat(...strings: string[]) {
        this.setState(this.state.concat(...strings));
    }

    slice(start?: number | undefined, end?: number | undefined) {
        this.setState(this.state.slice(start, end));
    }

    toLowerCase() {
        this.setState(this.state.toLowerCase());
    }

    toUpperCase() {
        this.setState(this.state.toUpperCase());
    }

    trim() {
        this.setState(this.state.trim());
    }

    trimStart() {
        this.setState(this.state.trimStart());
    }

    trimEnd() {
        this.setState(this.state.trimEnd());
    }
}
