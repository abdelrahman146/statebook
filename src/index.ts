import { Topic } from './Topic';

const topic = new Topic({ counter: 0 });

function counter() {
    const interval = setInterval(() => {
        if (topic.state.counter >= 3) {
            clearInterval(interval);
            console.log('Final State:', topic.state);
            return;
        }
        // console.log('Interval:', counter);
        topic.state = { counter: topic.state.counter + 1 };
    }, 1000);
}

counter();

setTimeout(() => topic.subscribe((state) => console.log({ state })), 5000);
