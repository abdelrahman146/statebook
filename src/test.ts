import { StatebookFactory } from './Statebook';
import { Topics } from './topics';

const users = [
    { name: 'Ahmad', age: 14 },
    { name: 'Ibrahim', age: 8 },
    { name: 'Abdel Rahman', age: 10 },
    { name: 'Heba', age: 10 },
    { name: 'Hanin', age: 12 },
    { name: 'Shaima', age: 6 },
    { name: 'Fatima', age: 3 },
    { name: 'Shahed', age: 2 },
    { name: 'Yaqeen', age: 0 },
];

const statebook = StatebookFactory({
    users: Topics.Array<{ name: string; age: number }>([]),
    user: Topics.String(''),
});

const sub1 = statebook.users.subscribe((state) => {
    statebook.user.setState(state.pop()?.name || '');
});

const sub2 = statebook.users.subscribe((state) => {
    console.log({ users: state });
});

const sub3 = statebook.user.subscribe((state) => {
    console.log({ user: state.toUpperCase() });
});

function counter() {
    let counter = 0;
    const interval = setInterval(() => {
        if (counter === 5) {
            sub1.unsubscribe();
            console.log('unsubscribed');
        }
        if (counter === users.length) {
            clearInterval(interval);
            return;
        }
        statebook.users.push(users[counter++]);
    }, 1000);
}

counter();
