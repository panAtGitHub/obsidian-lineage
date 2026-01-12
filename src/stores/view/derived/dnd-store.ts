import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const dndStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.document.dnd);
