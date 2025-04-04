import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';
import { updateScrollPosition } from 'src/stores/minimap/reducers/update-scroll-position';
import { deriveScrollPosition } from 'src/stores/minimap/reducers/derive-scroll-position';

const updateDocumentState = (
    state: MinimapState,
    action: MinimapStoreAction,
) => {
    if (action.type === 'minimap/set-card-ranges') {
        state.ranges.cards = action.payload.ranges;
        const newDocumentHeight =
            state.scrollbar.totalDrawnHeight_cpx !== action.payload.height_cpx;
        if (newDocumentHeight) {
            state.scrollbar.scrollPosition_cpx = 0;
        }
        state.scrollbar.totalDrawnHeight_cpx = action.payload.height_cpx;
        deriveScrollPosition(state);
    } else if (action.type === 'minimap/set-active-node') {
        state.activeCardId = action.payload.id;
        deriveScrollPosition(state);
    } else if (action.type === 'minimap/set-container-height') {
        state.scrollbar.containerHeight_cpx = action.payload.height_cpx;
        deriveScrollPosition(state);
    } else if (action.type === 'minimap/mouse-wheel-scroll') {
        updateScrollPosition(state, action.payload.delta_y_dpx);
    }
};
export const minimapReducer = (
    store: MinimapState,
    action: MinimapStoreAction,
): MinimapState => {
    updateDocumentState(store, action);
    return store;
};
