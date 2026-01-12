import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const activeBranchStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.document.activeBranch);
