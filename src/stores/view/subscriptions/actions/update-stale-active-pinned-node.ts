import { MandalaView } from 'src/view/view';
import { setActivePinnedNode } from 'src/stores/view/subscriptions/actions/set-active-pinned-node';

export const updateStaleActivePinnedNode = (view: MandalaView) => {
    const viewStore = view.viewStore;

    const pinnedNodes = view.documentStore.getValue().pinnedNodes.Ids;
    if (pinnedNodes.length > 0) {
        const activePinnedNode = viewStore.getValue().pinnedNodes.activeNode;
        if (!activePinnedNode || !pinnedNodes.includes(activePinnedNode)) {
            setActivePinnedNode(view, pinnedNodes[pinnedNodes.length - 1]);
        }
    }
};
