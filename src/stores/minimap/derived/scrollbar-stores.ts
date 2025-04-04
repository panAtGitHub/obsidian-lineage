import { ScrollInfo } from 'src/stores/minimap/minimap-state-type';
import { cpx_to_dpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { derived } from 'src/lib/store/derived';
import { LineageView } from 'src/view/view';

export const calculateThumbHeightDpx = (state: ScrollInfo) => {
    const isScrollIndicatorHidden =
        state.totalDrawnHeight_cpx <= state.containerHeight_cpx;
    if (isScrollIndicatorHidden) return 0;
    const indicatorHeight_cpx =
        (state.containerHeight_cpx / state.totalDrawnHeight_cpx) *
        state.containerHeight_cpx;

    return cpx_to_dpx(indicatorHeight_cpx);
};

export const ScrollThumbHeightStore = (view: LineageView) => {
    return derived(view.getMinimapStore(), (state) => {
        return calculateThumbHeightDpx(state.scrollbar);
    });
};

export const ScrollThumbPositionStore = (view: LineageView) => {
    return derived(view.getMinimapStore(), (_state) => {
        const state = _state.scrollbar;
        const indicatorHeight_dpx = calculateThumbHeightDpx(state);
        if (indicatorHeight_dpx === 0) return 0;

        const maxScroll_cpx =
            state.totalDrawnHeight_cpx - state.containerHeight_cpx;
        const scrollPercent = state.scrollPosition_cpx / maxScroll_cpx;
        const containerHeight_dpx = cpx_to_dpx(state.containerHeight_cpx);
        return scrollPercent * (containerHeight_dpx - indicatorHeight_dpx);
    });
};

export const MinimapScrollOffsetStore = (view: LineageView) =>
    derived(view.getMinimapStore(), (state) => {
        const offset = cpx_to_dpx(state.scrollbar.scrollPosition_cpx);
        return offset > 0 ? -1 * offset : offset;
    });
