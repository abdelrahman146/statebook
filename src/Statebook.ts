import { Topic } from './Topic';
import { useTopic as useTopicHook } from './hooks/useTopic';
import { GetTopicType, Status } from './types';

export function StatebookFactory<T extends { [topicId: string]: Topic }>(statebook: T) {
    return {
        ...statebook,
        reset() {
            for (const topicId in statebook) {
                statebook[topicId].reset();
            }
        },
        useTopic<K extends keyof T>(topicId: K): [GetTopicType<T[K]>, Status, T[K]] {
            return [...useTopicHook<T[K]>(statebook[topicId]), statebook[topicId]];
        },
    };
}
