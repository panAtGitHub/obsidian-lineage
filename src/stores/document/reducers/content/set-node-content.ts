import { Content } from 'src/stores/document/document-state-type';

export type SetNodeContentAction = {
    type: 'document/update-node-content';
    payload: {
        nodeId: string;
        content: string;
    };
    context: {
        isInSidebar: boolean;
    };
};

export type SetMultipleNodeContentAction = {
    type: 'document/update-multiple-node-content';
    payload: {
        updates: Array<{
            nodeId: string;
            content: string;
        }>;
    };
    context: {
        isInSidebar: boolean;
    };
};

export const setNodeContent = (
    content: Content,
    action: Pick<SetNodeContentAction, 'payload'>,
) => {
    const nodeContent = content[action.payload.nodeId];
    const contentString = nodeContent?.content || '';
    if (contentString === action.payload.content) return false;
    const nodeId = action.payload.nodeId;
    if (!nodeContent) content[nodeId] = { content: action.payload.content };
    else nodeContent.content = action.payload.content;
    return true;
};

export const setMultipleNodeContent = (
    content: Content,
    action: Pick<SetMultipleNodeContentAction, 'payload'>,
) => {
    const changedNodeIds: string[] = [];
    for (const update of action.payload.updates) {
        const nodeContent = content[update.nodeId];
        const current = nodeContent?.content || '';
        if (current === update.content) continue;
        if (!nodeContent) content[update.nodeId] = { content: update.content };
        else nodeContent.content = update.content;
        changedNodeIds.push(update.nodeId);
    }
    return changedNodeIds;
};
