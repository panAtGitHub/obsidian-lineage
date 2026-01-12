import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const MinimapRangesStore = (view: MandalaView) =>
    derived(view.getMinimapStore(), (state) => state.ranges.cards);
