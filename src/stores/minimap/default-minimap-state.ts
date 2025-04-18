import { MinimapState } from 'src/stores/minimap/minimap-state-type';
import { id } from 'src/helpers/id';

export const defaultMinimapState = (): MinimapState => ({
    canvasId: id.canvas(),
    activeCardId: '',
    scrollbar: {
        totalDrawnHeight_cpx: 0,
        scrollPosition_cpx: 0,
        containerHeight_cpx: 0,
    },
    ranges: {
        cards: {},
    },
});
