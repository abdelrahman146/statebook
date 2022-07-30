import { useEffect, useState } from 'react';
import { Topic } from '../Topic';
import { GetTopicType, Status } from '../types';

export function useTopic<T extends Topic>(topic: T): [GetTopicType<T>, Status] {
    const [state, setState] = useState<GetTopicType<T>>(topic.getState());
    const [status, setStatus] = useState<Status>(topic.getStatus());

    useEffect(() => {
        const sub = topic.subscribe((val, sts) => {
            setState(val);
            setStatus(sts);
        });
        return () => sub.unsubscribe();
    }, [topic]);

    return [state, status];
}
