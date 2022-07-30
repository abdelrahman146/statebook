import { Topic } from '../Topic';

export default class TopicObject<T extends { [key: string]: unknown }> extends Topic<T> {
    remove<K extends keyof T>(id: K) {
        this.setState({ ...this.state, [id]: undefined });
    }
    add<K extends keyof T>(id: K, value: T[K]) {
        this.setState({ ...this.state, [id]: value });
    }
    update<K extends keyof T>(id: K, value: T[K]) {
        this.setState({ ...this.state, [id]: value });
    }
}
