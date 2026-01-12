import { debounce } from 'obsidian';
import { MandalaView, MinimapStore } from 'src/view/view';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';
import { findCardAtPosition } from 'src/view/components/container/minimap/event-handlers/helpers/find-card-at-position';
import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

import { MinimapDomElements } from 'src/stores/minimap/minimap-state-type';

export const createOnCanvasMousemove = (view: MandalaView) => {
    let lastActiveCardId: string | null = null;

    let minimapStore: MinimapStore;

    let dom: MinimapDomElements;
    const hoverHandler = debounce((e: MouseEvent) => {
        if (!(e.buttons === 1 || (isMacLike ? e.metaKey : e.ctrlKey))) return;
        if (!minimapStore) {
            minimapStore = view.getMinimapStore();
            dom = view.getMinimapDom();
        }
        const rect = dom.canvas.getBoundingClientRect();
        const domY = e.clientY - rect.top;
        const y = dpx_to_cpx(domY);

        const ranges = minimapStore.getValue().ranges.cards;
        const cardId = findCardAtPosition(y, ranges, 0);
        if (cardId && cardId !== lastActiveCardId) {
            lastActiveCardId = cardId;

            view.viewStore.dispatch({
                type: 'view/set-active-node/mouse',
                payload: {
                    id: cardId,
                },
            });
            focusContainer(view);
        }
    }, 100);

    return (e: MouseEvent) => hoverHandler(e);
};
