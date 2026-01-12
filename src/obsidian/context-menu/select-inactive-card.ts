import { MandalaView } from 'src/view/view';

export const selectInactiveCard = (
    view: MandalaView,
    closestCardElement: HTMLElement,
    isInSidebar: boolean,
    isInRecentCardsList: boolean,
) => {
    const id = closestCardElement?.id;
    if (!isInSidebar) {
        view.viewStore.dispatch({
            type: 'view/set-active-node/mouse-silent',
            payload: {
                id,
            },
        });
    } else if (isInRecentCardsList) {
        view.viewStore.dispatch({
            type: 'view/recent-nodes/set-active-node',
            payload: {
                id,
            },
        });
    } else {
        view.viewStore.dispatch({
            type: 'view/pinned-nodes/set-active-node',
            payload: {
                id,
            },
        });
    }
};
