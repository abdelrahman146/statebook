import { Topic } from './Topic';

export function StatebookFactory<T extends { [topicId: string]: Topic }>(statebook: T) {
    return {
        ...statebook,
        reset() {
            for (const topicId in statebook) {
                statebook[topicId].reset();
            }
        },
    };
}
