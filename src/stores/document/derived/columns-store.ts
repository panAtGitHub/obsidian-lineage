import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const columnsStore = (view: MandalaView) =>
    derived(view.documentStore, (state) => state.document.columns);

export const singleColumnStore = (view: MandalaView) =>
    derived(view.documentStore, (state) => {
        const column = state.document.columns[0];
        return column ? [column] : [];
    });
