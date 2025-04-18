import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { calculateScrollDeltaToActiveCard } from 'src/stores/minimap/subscriptions/actions/set-scrollbar-position/calculate-scroll-delta-to-active-card';

export const deriveScrollPosition = (state: MinimapState) => {
    const activeCardRange = state.ranges.cards[state.activeCardId];
    if (!activeCardRange) return;
    const delta_cpx = calculateScrollDeltaToActiveCard(
        activeCardRange.y_start,
        activeCardRange.y_end,
        state.scrollbar.totalDrawnHeight_cpx,
        state.scrollbar.scrollPosition_cpx,
        state.scrollbar.containerHeight_cpx,
    );
    if (typeof delta_cpx === 'number') {
        state.scrollbar.scrollPosition_cpx = delta_cpx;
    }
};
