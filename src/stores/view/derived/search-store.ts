import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const searchStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.search);
