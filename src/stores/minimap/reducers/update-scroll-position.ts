import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';

export const updateScrollPosition = (
    state: MinimapState,
    delta_y_dpx: number,
) => {
    const delta_y_cpx = dpx_to_cpx(delta_y_dpx);
    if (state.scrollbar.containerHeight_cpx === 0) return;

    state.scrollbar.scrollPosition_cpx = Math.max(
        0,
        Math.min(
            state.scrollbar.totalDrawnHeight_cpx -
                state.scrollbar.containerHeight_cpx,
            state.scrollbar.scrollPosition_cpx + delta_y_cpx,
        ),
    );
};
