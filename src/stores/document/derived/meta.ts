import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const GroupParentIdsStore = (view: MandalaView) => {
    return derived(view.documentStore, (state) => {
        return state.meta.groupParentIds;
    });
};
