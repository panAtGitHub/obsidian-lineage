import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const IdSectionStore = (view: MandalaView) => {
    return derived(view.documentStore, (state) => {
        return state.sections.id_section;
    });
};
