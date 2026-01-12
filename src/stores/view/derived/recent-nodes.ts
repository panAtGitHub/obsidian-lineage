import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ActiveRecentNodeStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.recentNodes.activeNode);
