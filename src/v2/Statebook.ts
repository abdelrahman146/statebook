import { Topic } from "./Topic";

type Book<T> = {[topicId in keyof T]: Topic<T[topicId]>}
type Transformer<T, K> = (state: T) => K;

export class Statebook<T extends {[topicId: string]: unknown}> {
    private book: Book<T> = {} as Book<T>;
    constructor(topics: T) {
        for(const [topicId, state] of Object.entries(topics)){
            this.book[topicId as keyof T] = new Topic(state as T[keyof T]);
        }
    }
    
    getTopic<K extends keyof Book<T>, X>(topicId: K,  ) {
        if(!this.book[topicId]) throw new Error(`Cannot Find TopicID ${topicId as string}`)
        return this.book[topicId];
    }

    reset() {
        for(const topicId in this.book){
            this.book[topicId].reset();
        }
    }
}