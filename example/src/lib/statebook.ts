import { StatebookFactory, Topics } from 'statebook';

export const statebook = StatebookFactory({
    user: Topics.Object({
        name: '',
        age: null,
    }),
});

statebook.user.subscribe((user) => {
    console.log({ name: user.name });
});
