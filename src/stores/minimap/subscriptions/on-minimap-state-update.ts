import { LineageView } from 'src/view/view';
import { MinimapStoreAction } from 'src/stores/minimap/minimap-store-actions';
import invariant from 'tiny-invariant';
import { MinimapState } from 'src/stores/minimap/minimap-state-type';

export const onMinimapStateUpdate = (
    view: LineageView,
    action: MinimapStoreAction,
    state: MinimapState,
    localState: { previousScrollPosition: number },
) => {
    const minimapStore = view.minimapStore;
    invariant(minimapStore);
    if (
        action.type === 'minimap/set-active-node' ||
        action.type === 'minimap/set-container-height' ||
        action.type === 'minimap/mouse-wheel-scroll' ||
        action.type === 'minimap/set-card-ranges'
    ) {
        const scrollPosition = state.scrollbar.scrollPosition_cpx;
        if (scrollPosition !== localState.previousScrollPosition) {
            localState.previousScrollPosition = scrollPosition;
            view.minimapEffects.updateVisibleRange(view);
        }
    }
};
