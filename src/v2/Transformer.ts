import { Topic } from "./Topic";
import { Subscriber } from "./types";

export class Transformer<T> {

    constructor(private topic: Topic<T>){
        this.unsubscribe = this.unsubscribe.bind(this);
    }
    
    subscribe(subscriber: Subscriber<T>) {
        this.topic.subscribe(this as Transformer)
    }

    unsubscribe() {
        this.topic.unsubscribe(this as Transformer<T>);
    }

}